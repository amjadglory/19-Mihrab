import { environment } from './../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResInterface } from '../interface/login-res-interface';
import { SignupResInterface } from '../interface/signup-res-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  login(loginForm: object): Observable<LoginResInterface> {
    return this.httpClient.post<LoginResInterface>(environment.baseUrl + `users/signin`, loginForm);
  }
  sendSignupForm(signupForm: object): Observable<SignupResInterface> {
    return this.httpClient.post<SignupResInterface>(
      environment.baseUrl + `users/signup`,
      signupForm
    );
  }
}
