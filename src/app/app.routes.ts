import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { Signup } from './core/auth/components/signup/signup';
import { Login } from './core/auth/components/login/login';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { Timeline } from './features/timeline/components/timeline/timeline';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'signup', component: Signup },
      { path: 'login', component: Login },
    ],
  },
  {
    path: '',
    component: MainLayout,
    children: [{ path: 'timeline', component: Timeline }],
  },
];
