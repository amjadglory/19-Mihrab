import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const platId = inject(PLATFORM_ID);
  const router = inject(Router);
  if (isPlatformBrowser(platId)) {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      return router.parseUrl('/timeline');
    } else {
      return true;
    }
  }
  return true;
};
