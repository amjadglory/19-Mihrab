import { Component, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: WritableSignal<FormGroup> = signal(
    new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
        rePassword: new FormControl(null, [Validators.required]),
        dateOfBirth: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/),
        ]),
        gender: new FormControl(null, [Validators.required, Validators.pattern(/^(male|female)$/)]),
      },
      { validators: this.rePassConfirm }
    )
  );
  submitSignupForm() {
    if (this.signupForm().valid) {
      console.log(this.signupForm());
    }
  }
  rePassConfirm(group: AbstractControl): ValidationErrors | null {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
}
