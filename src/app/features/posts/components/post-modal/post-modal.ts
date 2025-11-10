import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { UserDataInterface } from '../../../users/interfaces/user-data-interface';
import { UsersService } from '../../../users/services/users-service';
import { isPlatformBrowser } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Posts } from '../../services/posts';
import { DomSanitizer } from '@angular/platform-browser';
import { DragDropImg } from '../../../../shared/directives/drag-drop-img';
import { ImgHandler } from '../../../../shared/interfaces/img-handler';
import { PostInterface } from '../../models/post';
import { UpdatePostService } from '../../services/update-post-service';

@Component({
  selector: 'app-post-modal',
  imports: [ReactiveFormsModule, DragDropImg],
  templateUrl: './post-modal.html',
  styleUrl: './post-modal.css',
})
export class PostModal implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly postsService = inject(Posts);
  private readonly platFormId = inject(PLATFORM_ID);
  private readonly ngbActiveModal = inject(NgbActiveModal);
  private readonly updatePostService = inject(UpdatePostService);

  posts: WritableSignal<PostInterface[]> = signal([]);

  userData: WritableSignal<UserDataInterface | undefined> = signal(undefined);
  isLoading: WritableSignal<boolean> = signal(false);
  postBody: WritableSignal<FormControl> = signal(
    new FormControl('', [Validators.minLength(4), Validators.maxLength(3000)])
  );
  fileInputControl: WritableSignal<FormControl> = signal(new FormControl());
  postBodyLength = toSignal(
    this.postBody().valueChanges.pipe(map((value) => (value || '').length)),
    { initialValue: 0 }
  );
  postImg: WritableSignal<File | null> = signal(null);
  postImgUrl: WritableSignal<string | ArrayBuffer | null> = signal(null);
  errMsg: WritableSignal<string> = signal('');

  postBeforUpdate: WritableSignal<FormData> = signal(this.updatePostService.getPostData());

  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      this.getUserInfo();
    }
  }

  deletePostImg(fileInput: HTMLInputElement) {
    fileInput.value === '';
    this.postImg.set(null);
    this.postImgUrl.set(null);
    // fileInput.type = 'text';
    // fileInput.type = 'file';
    this.fileInputControl().reset();
  }
  getPostImg(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    let fileInput = e.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const imgFile = fileInput.files[0];
      this.postImg.set(imgFile);
      let reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = (e) => {
        this.postImgUrl.set(reader.result);
      };
      // const imgHandle: ImgFileHandle = {
      //   file: imgFile,
      //   url: this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgFile)),
      // };
      // this.postImgUrl.set(imgHandle);
    }
  }
  droppedImg(imgFile: ImgHandler) {
    this.postImg.set(imgFile.file);
    this.postImgUrl.set(imgFile.url);
  }
  getUserInfo() {
    this.isLoading.set(true);
    this.usersService.getLoggedUserData().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.userData.set(res.user);
      },
      error: (err) => {
        this.isLoading.set(false);
      },
    });
  }
  closeModal(msg: string) {
    this.ngbActiveModal.dismiss(msg);
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
  sharePostData(e: Event) {
    e.preventDefault();
    if (this.postBody().valid) {
      const formData = new FormData();
      console.log(this.postBody().value, this.postImg());
      formData.append('body', this.postBody().value);
      let imgFile = this.postImg();
      if (imgFile) {
        formData.append('image', imgFile, imgFile.name);
      }
      this.postsService.createPost(formData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            // this.getAllPosts();
            this.closeModal('success');
          }
        },
        error: (err) => {
          console.log(err.error.error);
          this.errMsg.set(err.error.error);
        },
      });
    }
  }
  // updatePostData() {
  //   this.postBody().setValue(this.postBeforUpdate().get('body'));
  //   const imgValue = this.postBeforUpdate().get('image');
  //   if (imgValue instanceof File) {
  //     this.postImgUrl.set(URL.createObjectURL(imgValue));
  //   }
  // }
}
