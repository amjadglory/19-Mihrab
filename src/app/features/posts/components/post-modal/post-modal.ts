import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { UserDataInterface } from '../../../users/interfaces/user-data-interface';
import { UsersService } from '../../../users/services/users-service';
import { isPlatformBrowser } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-modal',
  imports: [],
  templateUrl: './post-modal.html',
  styleUrl: './post-modal.css',
})
export class PostModal implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly platFormId = inject(PLATFORM_ID);
  private readonly ngbActiveModal = inject(NgbActiveModal);

  userData: WritableSignal<UserDataInterface | undefined> = signal(undefined);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      this.getUserInfo();
    }
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
  closeModal() {
    // this.ngbActiveModal.close();
    this.ngbActiveModal.dismiss('exit');
  }
}
