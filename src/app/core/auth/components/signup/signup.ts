import { join } from 'node:path';
import { reverse } from 'dns';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FileHandle } from 'node:fs/promises';
import { UsersService } from '../../../../features/users/services/users-service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  signupErrMsg: WritableSignal<string> = signal('');
  signupSuccMsg: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  eyeOpen: WritableSignal<boolean> = signal(false);
  eyeOpenRe: WritableSignal<boolean> = signal(false);
  signupForm: WritableSignal<FormGroup> = signal(this.fb.group({}));
  // imgFile: WritableSignal<File | string> = signal('');
  // imgUrl: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm.set(
      this.fb.group(
        {
          name: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
          email: [null, [Validators.required, Validators.email]],
          password: [
            null,
            [
              Validators.required,
              Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
            ],
          ],
          rePassword: [null, [Validators.required]],
          dateOfBirth: [
            null,
            [
              Validators.required,
              Validators.pattern(/^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/),
            ],
          ],
          gender: [null, [Validators.required, Validators.pattern(/^(male|female)$/)]],
        },
        { validators: this.rePassConfirm }
      )
    );
  }
  submitSignupForm() {
    if (this.signupForm().valid) {
      this.isLoading.set(true);
      this.authService.sendSignupForm(this.signupForm().value).subscribe({
        next: (res) => {
          console.log(res);
          this.signupSuccMsg.set(res.message);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 800);
          this.signupErrMsg.set('');
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log(err.error);
          this.signupErrMsg.set(err.error.error);
          this.signupSuccMsg.set('');
          this.isLoading.set(false);
        },
      });
      // const formData = new FormData();
      // if (this.imgFile()) {
      //   formData.append('photo', this.imgFile());
      //   this.usersService.setUserPhoto(formData).subscribe({
      //     next: (res) => {
      //       console.log(res);
      //     },
      //     error: (err) => {
      //       console.log(err);
      //     },
      //   });
      // }
    } else {
      this.signupForm().setErrors({ mismatch: true });
      this.signupForm().markAllAsTouched();
    }
  }
  rePassConfirm(group: AbstractControl): ValidationErrors | null {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }

  // addProfileImg(e: Event) {
  //   let imgInput = e.target as HTMLInputElement;
  //   if (imgInput.files && imgInput.files.length > 0) {
  //     console.log(imgInput.files[0]);
  //     this.imgFile.set(imgInput.files[0]);
  // }
  // }
}
