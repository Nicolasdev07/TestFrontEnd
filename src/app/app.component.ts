import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface Invite {
  id: number;
  nom: string;
  dispo: boolean;
  repas: boolean;
  vegetarien: boolean;
  soiree: boolean;
  dodo: boolean;
  dimanche: boolean;
}

interface Invitation {
  id: number;
  repas: boolean;
  danse: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  invites: Invite[] = [
    {id: 1, nom: 'Nicolas ARNAUDON', dispo: true, repas: true, vegetarien: true, soiree:true, dodo:true, dimanche:true},
    {id: 2, nom: 'David ARNAUDON', dispo: false, repas: false, vegetarien: false, soiree:false, dodo:false, dimanche:false},
    {id: 3, nom: 'Pauline ARNAUDON', dispo: true, repas: true, vegetarien: true, soiree:true, dodo:true, dimanche:true}
  ];

  invitation: Invitation;

  constructor(private fb: FormBuilder) { }
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    isEditable = true;

    ngOnInit() {
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

    onSubmit(firstFormGroup) {
      console.warn(firstFormGroup.nom);
      console.warn(this.secondFormGroup.value);
      this.invitation = {id: 1, repas: true, danse: true}
      console.warn(this.invitation);
    }

}
