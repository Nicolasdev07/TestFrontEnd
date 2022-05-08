import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Invite } from './invite';
import { InviteService } from './invite.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  invites: Invite[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  choixInvitation: number;
  famille: number;
  inviteUpdate:Invite;
  /*
  invites: Invite[] = [
    {id: 1, nom: 'Nicolas ARNAUDON', dispo: true, repas: true, vegetarien: true, soiree:true, dodo:true, dimanche:true},
    {id: 2, nom: 'David ARNAUDON', dispo: false, repas: false, vegetarien: false, soiree:false, dodo:false, dimanche:false},
    {id: 3, nom: 'Pauline ARNAUDON', dispo: true, repas: true, vegetarien: true, soiree:true, dodo:true, dimanche:true}
  ];
  */

  filteredOptions: Observable<Invite[]>;
  nom: FormControl;
    constructor(private inviteService: InviteService,  private fb: FormBuilder) {

      this.nom = this.fb.control('');

      this.firstFormGroup = this.fb.group({
        nom: this.nom
      });


      this.secondFormGroup = this.fb.group({
        disponibilite: [''],
        apero: [''],
        repas: [''],
        vegetarien: [''],
        soiree: [''],
        dodo: [''],
        dimanche: [''],
        famille: ['']
      });
    }

    ngOnInit() {
      this.getInvites();
    }

    displayFn(invite: Invite): string {
      return invite.nom ? invite.nom : '';
    }

    private _filter(nom: string): Invite[] {
      const filterValue = nom.toLowerCase();

      return this.invites.filter(option => option.nom.toLowerCase().includes(filterValue));
    }

    private getInvites(){
      this.inviteService.getInvitesList().subscribe(data => {
        this.invites = data;
        this.filteredOptions = this.nom.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(nom => (nom ? this._filter(nom) : this.invites.slice())),
        );
      });
    }

    onSubmit(firstFormGroup) {
      this.inviteService.getInviteById(firstFormGroup.nom.id).subscribe(data => {
           this.famille = data.idFamille;
           this.choixInvitation = data.choixInvitation;
           this.inviteUpdate = data;
      }, error => console.log(error));
    }


    onSubmitTwo() {
      console.log(this.secondFormGroup.value)
       this.inviteUpdate.danse = this.secondFormGroup.value.soiree == 0 ? false : true
       this.inviteUpdate.repas = this.secondFormGroup.value.repas == 0 ? false : true
       this.inviteUpdate.vegetarien = this.secondFormGroup.value.vegetarien == 0 ? false : true
       this.inviteUpdate.dimanche = this.secondFormGroup.value.dimanche == 0 ? false : true
       this.inviteUpdate.disponible = this.secondFormGroup.value.disponibilite == 0 ? false : true
       this.inviteUpdate.dodo = this.secondFormGroup.value.dodo

       this.inviteService.updateInvite(this.inviteUpdate.id, this.inviteUpdate).subscribe( data =>{}, error => console.log(error));
    }
}
