import { Component } from '@angular/core';
import { SinglePost } from '../single-post/single-post';

@Component({
  selector: 'app-posts-list',
  imports: [SinglePost],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
})
export class PostsList {}
