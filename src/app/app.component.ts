import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

interface Invite {
  id: number;
  nom: string;
}

interface RepasDanse {
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
    {id: 1, nom: 'Nicolas'},
    {id: 2, nom: 'David'},
    {id: 3, nom: 'Pauline'},
  ];

  donneesInvite: RepasDanse[];

  profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      disponibilite: [''],
      apero: [''],
      repas: [''],
      vegetarien: [''],
      soiree: [''],
      dodo: [''],
      dimanche: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      aliases: this.fb.array([
        this.fb.control('')
      ])
    });

    selectionDonneesInvite(){
      this.donneesInvite = [
          {id: 1, repas: true, danse: true},
          {id: 2, repas: false, danse: true},
          {id: 3, repas: true, danse: false},
        ];
    }

    get aliases() {
      return this.profileForm.get('aliases') as FormArray;
    }

    constructor(private fb: FormBuilder) { }

    updateProfile() {
      this.profileForm.patchValue({
        firstName: 'Nancy',
        address: {
          street: '123 Drew Street'
        }
      });
    }

    addAlias() {
      this.aliases.push(this.fb.control(''));
    }

    onSubmit() {
      // TODO: Use EventEmitter with form value
      console.warn(this.profileForm.value);
    }
}
