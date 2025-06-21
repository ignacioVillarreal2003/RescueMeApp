import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthorized: boolean = true;
  if (!isAuthorized) {
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
