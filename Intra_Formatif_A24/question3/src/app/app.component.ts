import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';


  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group(
      {
        nom: ['', [Validators.required]],
        numRue: ['', [
          Validators.required,
          Validators.min(1000),
          Validators.max(9999)
        ]],
        codePostal: ['', [Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
        commentaire: ['', [
         
          this.minimumMots,
        ]],
      },
      {
        validators: this.nomDansCommentaireValidator

      }
      
    )
  }

  minimumMots(control: AbstractControl): ValidationErrors | null {
    const texte = control.value

    if (!texte) {
      return null
    }
    const mots = texte.split(' ');

    if (mots.length < 10) {
      return { minMots: true };
    }
    return null
  }

   nomDansCommentaireValidator(control: AbstractControl): ValidationErrors | null {

  const nom = control.get('nom')?.value;
  const commentaire = control.get('commentaire')?.value;

  if (!nom || !commentaire) return null;

  if (commentaire.toLowerCase().includes(nom.toLowerCase())) {

    control.get('commentaire')?.setErrors({
      nomDansCommentaire: true
    });

  }

  return null;
}





}


