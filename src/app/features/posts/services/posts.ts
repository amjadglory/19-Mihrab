import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { GetAllPostsInterface } from '../../../shared/interfaces/get-all-posts-interface';
import { CreatePostInterface } from '../../../shared/interfaces/create-post-interface';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  constructor(private httpClient: HttpClient) {}
  createPost(body: FormData): Observable<CreatePostInterface> {
    return this.httpClient.post<CreatePostInterface>(environment.baseUrl + `posts`, body);
  }
  getAllPosts(): Observable<GetAllPostsInterface> {
    return this.httpClient.get<GetAllPostsInterface>(environment.baseUrl + `posts`);
  }
  getCurrentPosts(currentPage: number): Observable<GetAllPostsInterface> {
    return this.httpClient.get<GetAllPostsInterface>(
      environment.baseUrl + `posts?page=${currentPage}`
    );
  }
  // updatePost(postBody: Object, postId: string): Observable<any> {
  //   return this.httpClient.put(environment.baseUrl + `posts/${postId}`, postBody);
  // }
}
