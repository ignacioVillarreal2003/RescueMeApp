import { HttpInterceptorFn } from '@angular/common/http';
import {SessionService} from '../services/session/session.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService: SessionService = inject(SessionService);
  const token: string | undefined = sessionService.session()?.token;
  if (token != undefined) {
    const authorization: string = `Bearer ${token}`;

    const modifiedRequest = req.clone({
      setHeaders: {
        Authorization: authorization
      }
    });
    return next(modifiedRequest);
  }
  return next(req);
};
