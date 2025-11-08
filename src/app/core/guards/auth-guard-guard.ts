import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platId)) {
    const localToken = localStorage.getItem('token');
    if (localToken !== null) {
      return true;
    } else {
      return router.parseUrl('/login');
    }
  }
  return router.parseUrl('/login');
};
