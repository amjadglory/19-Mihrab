import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SinglePost } from '../single-post/single-post';
import { Posts } from '../../services/posts';
import { isPlatformBrowser } from '@angular/common';
import { PostInterface } from '../../models/post';

@Component({
  selector: 'app-posts-list',
  imports: [SinglePost],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
})
export class PostsList implements OnInit {
  private readonly postsService = inject(Posts);
  private readonly platFormId = inject(PLATFORM_ID);
  posts: PostInterface[] = [];
  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      this.getAllPosts();
    }
  }
  getAllPosts() {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.posts = res.posts;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
