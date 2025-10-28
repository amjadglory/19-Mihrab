import { Component, computed, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { PostInterface } from '../../models/post';
import { DatePipe } from '@angular/common';
import { reverse } from 'dns';

@Component({
  selector: 'app-single-post',
  imports: [DatePipe],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css',
})
export class SinglePost implements OnInit {
  @Input() post!: PostInterface;
  showMoreComments: WritableSignal<boolean> = signal(false);
  toggleComments() {
    this.showMoreComments.update((v) => !v);
  }
  ngOnInit(): void {
    this.post.comments.reverse();
  }
  displayComments = computed(() => {
    return this.showMoreComments() ? this.post.comments : this.post.comments.slice(0, 2);
  });
}
