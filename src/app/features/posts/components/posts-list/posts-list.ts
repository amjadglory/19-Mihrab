import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  WritableSignal,
  signal,
  computed,
} from '@angular/core';
import { SinglePost } from '../single-post/single-post';
import { Posts } from '../../services/posts';
import { isPlatformBrowser } from '@angular/common';
import { PostInterface } from '../../models/post';
import { PostPlaceHolderComponent } from '../../../../shared/components/post-place-holder-component/post-place-holder-component';

@Component({
  selector: 'app-posts-list',
  imports: [SinglePost, PostPlaceHolderComponent],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
})
export class PostsList implements OnInit {
  private readonly postsService = inject(Posts);
  private readonly platFormId = inject(PLATFORM_ID);

  posts: WritableSignal<PostInterface[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      this.getAllPosts();
    }
  }
  getAllPosts() {
    this.isLoading.set(true);
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.posts.set(res.posts);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }
}
