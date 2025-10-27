import { Component, Input } from '@angular/core';
import { PostInterface } from '../../models/post';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-post',
  imports: [DatePipe],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css',
})
export class SinglePost {
  @Input() post!: PostInterface;
}
