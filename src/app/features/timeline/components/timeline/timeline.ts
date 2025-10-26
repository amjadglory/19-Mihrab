import { Component } from '@angular/core';
import { PostsList } from '../../../posts/components/posts-list/posts-list';

@Component({
  selector: 'app-timeline',
  imports: [PostsList],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline {}
