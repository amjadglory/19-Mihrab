import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UsersService } from '../../../users/services/users-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  private readonly usersService = inject(UsersService);

  imgFile: WritableSignal<File | null> = signal(null);
  imgUrl: WritableSignal<string> = signal('');
  isMale: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.setUserImg();
    this.getUserPhoto();
  }

  addProfileImg(e: Event) {
    let imgInput = e.target as HTMLInputElement;
    if (imgInput.files && imgInput.files.length > 0) {
      console.log(imgInput.files[0]);
      this.imgFile.set(imgInput.files[0]);
      this.getUserPhoto();
    }

    const formData = new FormData();
    let imgFileStringed = this.imgFile();
    if (imgFileStringed) {
      formData.append('photo', imgFileStringed, imgFileStringed.name);
      this.usersService.setUserPhoto(formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  setUserImg() {
    this.usersService.getLoggedUserData().subscribe({
      next: (res) => {
        console.log(res);
        if (res.user.gender === 'male') {
          this.isMale.set(true);
        } else {
          this.isMale.set(false);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserPhoto() {
    this.usersService.getLoggedUserData().subscribe({
      next: (res) => {
        this.imgUrl.set(res.user.photo);
      },
    });
  }
}
