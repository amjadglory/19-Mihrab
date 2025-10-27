import { HttpInterceptorFn } from '@angular/common/http';

export const httpHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage != 'undefined') {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
  return next(req);
};
