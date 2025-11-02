import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface } from '../../../shared/interfaces/comment-interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CreateComment {
  private readonly httpClient = inject(HttpClient);

  createComment(commentBody: CommentInterface): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `comments`, commentBody);
  }
}
