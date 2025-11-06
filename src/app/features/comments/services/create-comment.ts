import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface } from '../../../shared/interfaces/comment-interface';
import { environment } from '../../../../environments/environment.development';
import { CommentResInterceptor } from '../../../shared/interfaces/comment-res-interceptor';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly httpClient = inject(HttpClient);

  createComment(commentBody: CommentInterface): Observable<CommentResInterceptor> {
    return this.httpClient.post<CommentResInterceptor>(
      environment.baseUrl + `comments`,
      commentBody
    );
  }
  updateComment(updatedComment: string, commentId: string): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `comments/${commentId}`, {
      content: updatedComment,
    });
  }
  // getCommentsAfterUpdate(postId: string): Observable<any> {
  //   return this.httpClient.get(environment.baseUrl + `posts/${postId}/comments`);
  // }
}
