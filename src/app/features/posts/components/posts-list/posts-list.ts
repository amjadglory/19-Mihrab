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
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { PostInterface } from '../../models/post';
import { PostPlaceHolderComponent } from '../../../../shared/components/post-place-holder-component/post-place-holder-component';
import { UsersService } from '../../../users/services/users-service';
import { UserDataInterface } from '../../../users/interfaces/user-data-interface';

@Component({
  selector: 'app-posts-list',
  imports: [SinglePost, PostPlaceHolderComponent, NgStyle],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
})
export class PostsList implements OnInit {
  private readonly postsService = inject(Posts);
  private readonly usersService = inject(UsersService);
  private readonly platFormId = inject(PLATFORM_ID);

  posts: WritableSignal<PostInterface[]> = signal([]);
  userData: WritableSignal<UserDataInterface | undefined> = signal(undefined);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      this.getAllPosts();
      this.getUserInfo();
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
  getUserInfo() {
    this.usersService.getLoggedUserData().subscribe({
      next: (res) => {
        console.log(res);
        this.userData.set(res.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
