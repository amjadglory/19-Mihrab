import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { Signup } from './core/auth/components/signup/signup';
import { Login } from './core/auth/components/login/login';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { Timeline } from './features/timeline/components/timeline/timeline';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { UserProfile } from './features/timeline/components/user-profile/user-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayout,
    canActivate: [isLoggedGuard],
    children: [
      { path: 'signup', component: Signup },
      { path: 'login', component: Login },
    ],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuardGuard],
    children: [
      { path: 'timeline', component: Timeline },
      { path: 'user', component: UserProfile },
    ],
  },
];
