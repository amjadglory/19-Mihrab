import { Component, inject, OnInit, PLATFORM_ID, WritableSignal, signal } from '@angular/core';
import { SinglePost } from '../single-post/single-post';
import { Posts } from '../../services/posts';
import { isPlatformBrowser } from '@angular/common';
import { PostInterface } from '../../models/post';
import { PostPlaceHolderComponent } from '../../../../shared/components/post-place-holder-component/post-place-holder-component';
import { UsersService } from '../../../users/services/users-service';
import { UserDataInterface } from '../../../users/interfaces/user-data-interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostModal } from '../post-modal/post-modal';
import { UpdatePostService } from '../../services/update-post-service';

@Component({
  selector: 'app-posts-list',
  imports: [SinglePost, PostPlaceHolderComponent],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
})
export class PostsList implements OnInit {
  private readonly postsService = inject(Posts);
  private readonly usersService = inject(UsersService);
  private readonly platFormId = inject(PLATFORM_ID);
  private readonly modalService = inject(NgbModal);
  private readonly updatePostService = inject(UpdatePostService);

  posts: WritableSignal<PostInterface[]> = signal([]);
  userData: WritableSignal<UserDataInterface | undefined> = signal(undefined);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      this.getAllPosts();
      this.getUserInfo();
    }
  }
  getCurrnetPosts(currentPage: number) {
    this.postsService.getCurrentPosts(currentPage).subscribe({
      next: (res) => {
        console.log(res);
        this.posts.set(res.posts.reverse());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllPosts() {
    this.isLoading.set(true);
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        let currntPage: number = res.paginationInfo.numberOfPages;
        this.getCurrnetPosts(currntPage);
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
  openModal() {
    this.modalService
      .open(PostModal, {
        centered: true,
        animation: true,
        size: 'lg',
        backdrop: true,
        backdropClass: 'bgSecundaryColor',
      })
      .result.then(
        (resulte) => {
          console.log(resulte);
        },
        (reason) => {
          console.log(reason);
          if (reason === 'success') {
            this.getAllPosts();
          }
        }
      );
  }
  // updatePost(postBody: string, postImg: string, postId: string) {
  //   console.log(postBody, postImg, postId);
  //   this.openModal();
  //   this.updatePostService.setPostData(postBody, postImg, postId);
  //   // this.postsService.updatePost(postBody, postId);
  // }
}
