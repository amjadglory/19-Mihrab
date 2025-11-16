import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../features/users/services/users-service';

@Component({
  selector: 'app-navbar',
  imports: [NgbCollapseModule, RouterLink, NgbDropdownModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private readonly usersService = inject(UsersService);

  isMenuCollapsed = true;
  imgFile: WritableSignal<File | string> = signal('');
  imgUrl: WritableSignal<string> = signal('');
  isMale: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.setUserImg();
    this.getUserPhoto();
  }

  removeToken() {
    localStorage.setItem('token', '');
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
