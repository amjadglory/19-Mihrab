import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: WritableSignal<boolean> = signal(false);
  loginErrMsg: WritableSignal<string> = signal('');
  loginsucMsg: WritableSignal<string> = signal('');

  loginForm: WritableSignal<FormGroup> = signal(
    this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    })
  );

  submitLoginForm() {
    if (this.loginForm().valid) {
      this.isLoading.set(true);
      this.authService.login(this.loginForm().value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading.set(false);
          this.loginsucMsg.set(res.message);
          this.loginErrMsg.set('');
          localStorage.setItem('token', res.token);
          setTimeout(() => {
            this.router.navigate(['/timeline']);
          }, 800);
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
          this.loginsucMsg.set('');
          this.loginErrMsg.set(err.error.error);
        },
      });
    }
  }
}
