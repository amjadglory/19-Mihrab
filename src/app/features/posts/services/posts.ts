import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  constructor(private httpClient: HttpClient) {}
  createPost(body: FormData): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `posts`, body);
  }
  getAllPosts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `posts`);
  }
}
