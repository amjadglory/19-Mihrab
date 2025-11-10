import { Comment } from './../../../../shared/interfaces/get-all-posts-interface';
import { UsersService } from './../../../users/services/users-service';
import { reverse } from 'dns';
import { Component, computed, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { PostInterface } from '../../models/post';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../../comments/services/create-comment';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-single-post',
  imports: [DatePipe, ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css',
})
export class SinglePost implements OnInit {
  private readonly commentService = inject(CommentService);
  private readonly usersService = inject(UsersService);

  @Input() post!: PostInterface;
  // @Input() updatePost!: (postBody: string, postImg: string, postId: string) => void;

  // updatePostSon(postBody: string, postImg: string, postId: string) {
  //   this.updatePost(postBody, postImg, postId);
  // }

  showMoreComments: WritableSignal<boolean> = signal(false);
  isShare: WritableSignal<boolean> = signal(true);
  commentControl: WritableSignal<FormControl> = signal(
    new FormControl(null, [Validators.minLength(4), Validators.maxLength(300)])
  );
  comments = signal<Comment[]>([]);
  commentId: WritableSignal<string> = signal('');
  userId: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.comments.set(this.post.comments.reverse());
    this.getUserId();
  }
  getUserId() {
    this.usersService.getLoggedUserData().subscribe({
      next: (res) => {
        this.userId.set(res.user._id);
      },
    });
  }
  toggleComments() {
    this.showMoreComments.update((v) => !v);
  }
  toShare() {
    this.isShare.set(true);
  }
  toEdit() {
    this.isShare.set(false);
  }
  displayComments = computed(() => {
    return this.showMoreComments() ? this.comments() : this.comments().slice(0, 2);
  });
  commentLength = toSignal(
    this.commentControl().valueChanges.pipe(map((value) => (value || '').length)),
    { initialValue: 0 }
  );
  shareComment(e: Event) {
    e.preventDefault();
    if (this.commentControl().valid) {
      let commentBody = {
        content: this.commentControl().value,
        post: this.post._id,
      };
      this.commentService.createComment(commentBody).subscribe({
        next: (res) => {
          console.log(res);
          this.commentControl().reset();
          if (res.comments) {
            this.comments.set(res.comments);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  updateComment(e: Event, updatedComment: string, commentId: string) {
    e.preventDefault();
    this.commentService.updateComment(updatedComment, commentId).subscribe({
      next: (res) => {
        console.log(res);
        const updatedComments = this.comments().map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              content: updatedComment,
            };
          }
          return comment;
        });
        this.comments.set(updatedComments);
        this.toShare();
        this.commentControl().reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getOldCommentValue(oldValue: string | undefined) {
    this.commentControl().setValue(oldValue);
  }
  // getCommentsAfterUpdate(postId: string) {
  //   this.commentService.getCommentsAfterUpdate(postId).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (res) => {
        console.log(res);
        const nonDeletedComents: Comment[] = this.comments().filter(
          (comment: Comment) => comment._id !== commentId
        );
        this.comments.set(nonDeletedComents);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
