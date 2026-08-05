import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(AuthService).token();
  if (!token) {
    return inject(Router).createUrlTree(['/login']);
  }
  return true;
};
