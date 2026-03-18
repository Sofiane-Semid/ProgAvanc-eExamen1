import { Component, signal } from '@angular/core';
import { AbstractControl, AbstractFormGroupDirective, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

interface Data{
  Question1?: string | null ;
  Question2?: string | null ;
}


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  catform: FormGroup;
  formData: Data | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.catform = this.formBuilder.group(
      {
        Question1: ['', [Validators.required,]],
        Question2: ['', [Validators.required,]],
      },{validators: this.catValidator});
    

    this.catform.valueChanges.subscribe(() => {
      this.formData = this.catform.value
    });
  }


  catValidator(control: AbstractControl): ValidationErrors | null {
     const q1 = control.get('Question1')?.value;
     const q2 = control.get('Question2')?.value;
    
    let uneErreur = false

    if (q1 && q1 !== 'chat') {
      control.get('Question1')?.setErrors({ fauxAnimal: true });
      uneErreur = true;
    }
    if (q2 && q2 !== 'oui') {
      control.get('Question2')?.setErrors({ fauxChoix: true });
      uneErreur = true;
    }
    return uneErreur?{uneErreur:true}:null;
  };
}
    

    
   
  


  



