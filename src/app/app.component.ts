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

  invites; invitesFamille : Invite[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  radioFamilleDiv = false;
  choixInvitation: number;
  famille: number;
  inviteUpdate:Invite;

  filteredOptions: Observable<Invite[]>;
  nom: FormControl;

    constructor(private inviteService: InviteService,  private fb: FormBuilder) {
      console.log('Entrée dans le controller');
      this.inviteService.getInvitesList().subscribe(data => {
        console.log('Entrée dans le service getInvitesList');
        this.invites = data;
        this.filteredOptions = this.nom.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(nom => (nom ? this._filter(nom) : this.invites.slice())),
        );
        console.log('Sortie service');
      });

      this.nom = this.fb.control('', Validators.required);

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
        famille: [''],
        commentaire: ['']
      });
      console.log('Sortie controller');
    }

    displayFn(invite: Invite): string {
      return invite.nom ? invite.nom : '';
    }

    private _filter(nom: string): Invite[] {
      const filterValue = nom.toLowerCase();

      return this.invites.filter(option => option.nom.toLowerCase().includes(filterValue));
    }

    onSubmit(firstFormGroup) {
      if(firstFormGroup.nom.id == undefined){
        alert('Merci de sélectionner un utilisateur dans la liste déroulante')
        window.location.reload()
      }
      this.inviteService.getInviteById(firstFormGroup.nom.id).subscribe(data => {
           this.famille = data.idFamille;
           this.choixInvitation = data.choixInvitation;
           this.inviteUpdate = data;
      }, error => console.log(error));
    }

    onSubmitTwo() {
          if (this.secondFormGroup.value.famille != 1 && this.secondFormGroup.value.famille != 2 ) {
            this.secondFormGroup.value.famille = 3;
          }

          if (this.secondFormGroup.value.famille == 1 || this.secondFormGroup.value.famille == 2 ) {
            this.inviteService.getInvitesListByIdFamille(this.inviteUpdate.idFamille).subscribe(data => {
                data.forEach((value) => {
                    if(value.adulte == false && this.secondFormGroup.value.famille == 2 ) {
                      value.disponible = false
                    }else{
                      value.danse = this.secondFormGroup.value.soiree == 0 ? false : true
                      value.repas = this.secondFormGroup.value.repas == 0 ? false : true
                      value.vegetarien = this.secondFormGroup.value.vegetarien == 0 ? false : true
                      value.dimanche = this.secondFormGroup.value.dimanche == 0 ? false : true
                      value.disponible = this.secondFormGroup.value.disponibilite == 0 ? false : true
                      value.apero = this.secondFormGroup.value.apero == 0 ? false : true
                      value.dodo = this.secondFormGroup.value.dodo
                      value.commentaire = this.secondFormGroup.value.commentaire
                    }
                    this.inviteService.updateInvite(value.id, value).subscribe( data =>{}, error => console.log(error));
                });
            }, error => console.log(error));
          }

       if (this.secondFormGroup.value.famille == 3)
       {
          this.inviteUpdate.danse = this.secondFormGroup.value.soiree == 0 ? false : true
          this.inviteUpdate.repas = this.secondFormGroup.value.repas == 0 ? false : true
          this.inviteUpdate.vegetarien = this.secondFormGroup.value.vegetarien == 0 ? false : true
          this.inviteUpdate.dimanche = this.secondFormGroup.value.dimanche == 0 ? false : true
          this.inviteUpdate.disponible = this.secondFormGroup.value.disponibilite == 0 ? false : true
          this.inviteUpdate.apero = this.secondFormGroup.value.apero == 0 ? false : true
          this.inviteUpdate.commentaire = this.secondFormGroup.value.commentaire
          this.inviteUpdate.dodo = this.secondFormGroup.value.dodo
          console.log('ok');
          this.inviteService.updateInvite(this.inviteUpdate.id, this.inviteUpdate).subscribe( data =>{}, error => console.log(error));
       }

    }

    handleChange(evt) {
        this.inviteService.getInvitesListByIdFamille(this.inviteUpdate.idFamille).subscribe(data => {
           this.invitesFamille = data;
           if (evt.source._checked && evt.source._value =='1') {
               this.radioFamilleDiv = true;
           } else if (evt.source._checked && evt.source._value =='2') {
               this.radioFamilleDiv = true;
               this.invitesFamille = this.invitesFamille.filter((obj) => {
                  return obj.adulte === true;
               });
           } else {
               this.radioFamilleDiv = false;
           }
        }, error => console.log(error));
    }
}
