import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: WritableSignal<FormGroup> = signal(
    new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
      rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
      dateOfBirth: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/),
      ]),
      gender: new FormControl(null, [Validators.required, Validators.pattern(/^(male|female)$/)]),
    })
  );
  submitSignupForm() {
    console.log(this.signupForm());
  }
}
