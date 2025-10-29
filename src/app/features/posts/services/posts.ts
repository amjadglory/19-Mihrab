import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { GetAllPostsInterface } from '../../../shared/interfaces/get-all-posts-interface';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  constructor(private httpClient: HttpClient) {}
  createPost(body: FormData): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `posts`, body);
  }
  getAllPosts(): Observable<GetAllPostsInterface> {
    return this.httpClient.get<GetAllPostsInterface>(environment.baseUrl + `posts`);
  }
}
