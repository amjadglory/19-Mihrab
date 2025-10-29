import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { GetLoggedUserDataInterface } from '../../../shared/interfaces/get-logged-user-data-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly httpClient = inject(HttpClient);
  getLoggedUserData(): Observable<GetLoggedUserDataInterface> {
    return this.httpClient.get<GetLoggedUserDataInterface>(
      environment.baseUrl + 'users/profile-data'
    );
  }
}
