import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  customUserValidator(control: AbstractControl): ValidationErrors | null {
    const validUser = 'admin@mrc.edu.pe';
    return control.value === validUser ? null : { custom: true };
  }

  customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordPattern = 'abc123';
    return control.value === passwordPattern ? null : { customPassword: true };
  }


  hide = true;
  formLogin: FormGroup = new FormGroup({});

  constructor(private router: Router) {
    this.initFormGroup();
  }

  initFormGroup() {
    this.formLogin = new FormGroup({
      user: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        this.customUserValidator.bind(this)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        this.customPasswordValidator.bind(this)
      ])
    });
  }

  sendUser() {
    // console.log("FORM VALID:", this.formLogin.valid);
    // console.log("VALUES:", this.formLogin.value);

    if (!this.formLogin.valid) {
      console.error("El formulario es inválido.");
      return;
    }

    const { value } = this.formLogin;

    if (value.user === 'admin@mrc.edu.pe' && value.password === 'abc123') {
      this.router.navigate(['/home/matricula']);
    } else {
      console.error('El usuario o contraseña son incorrectos.');
    }
  }


  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
