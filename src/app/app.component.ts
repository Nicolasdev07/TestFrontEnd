import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Invite } from './invite';
import { InviteService } from './invite.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  invites: Invite[];
  /*
  invites: Invite[] = [
    {id: 1, nom: 'Nicolas ARNAUDON', dispo: true, repas: true, vegetarien: true, soiree:true, dodo:true, dimanche:true},
    {id: 2, nom: 'David ARNAUDON', dispo: false, repas: false, vegetarien: false, soiree:false, dodo:false, dimanche:false},
    {id: 3, nom: 'Pauline ARNAUDON', dispo: true, repas: true, vegetarien: true, soiree:true, dodo:true, dimanche:true}
  ];
  */

  constructor(private inviteService: InviteService,  private fb: FormBuilder) { }
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    isEditable = true;
    choixInvitation: number;

    ngOnInit() {
      this.getInvites();

      this.firstFormGroup = this.fb.group({
        nom: ['', Validators.required]
      });

      this.secondFormGroup = this.fb.group({
        disponibilite: [''],
        apero: [''],
        repas: [''],
        vegetarien: [''],
        soiree: [''],
        dodo: [''],
        dimanche: ['']
      });
    }

    private getInvites(){
      this.inviteService.getInvitesList().subscribe(data => {this.invites = data;});
    }

    onSubmit(firstFormGroup) {
      console.warn(firstFormGroup.nom);

      this.inviteService.getInviteById(firstFormGroup.nom).subscribe(data => {
           this.choixInvitation = data.choixInvitation;
      }, error => console.log(error));
    }

}
