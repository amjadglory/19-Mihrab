import { reverse } from 'dns';
import { Component, computed, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { PostInterface } from '../../models/post';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateComment } from '../../../comments/services/create-comment';
import { Comment } from '../../../../shared/interfaces/get-all-posts-interface';

@Component({
  selector: 'app-single-post',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css',
})
export class SinglePost implements OnInit {
  private readonly createComment = inject(CreateComment);

  @Input() post!: PostInterface;
  showMoreComments: WritableSignal<boolean> = signal(false);
  commentControl: WritableSignal<FormControl> = signal(
    new FormControl(null, [Validators.minLength(4), Validators.maxLength(300)])
  );
  comments = signal<Comment[]>([]);

  ngOnInit(): void {
    this.comments.set(this.post.comments.reverse());
  }

  toggleComments() {
    this.showMoreComments.update((v) => !v);
  }
  displayComments = computed(() => {
    return this.showMoreComments() ? this.comments() : this.comments().slice(0, 2);
  });
  shareComment(e: Event) {
    e.preventDefault();
    if (this.commentControl().valid) {
      let commentBody = {
        content: this.commentControl().value,
        post: this.post._id,
      };
      this.createComment.createComment(commentBody).subscribe({
        next: (res) => {
          console.log(res.comments);
          this.commentControl().setValue('');
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
}
