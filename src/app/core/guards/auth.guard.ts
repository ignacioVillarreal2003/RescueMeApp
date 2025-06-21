import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SessionService} from '../services/session/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const session = inject(SessionService);
  if (session.session() == undefined) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
