import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {ToastService} from '../services/components/toast-service';
import {inject} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService: ToastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<never> => {
      let message: string;

      if (error.error instanceof ErrorEvent) {
        message = 'A client-side error occurred: ' + error.error.message;
      }
      else {
        if (error.status >= 500) {
          message = 'Server error. Please try again later.';
        }
        else if (error.status >= 400) {
          message = error.error?.message || 'Request error. Please check your input.';
        }
        else if (error.status === 0) {
          message = 'No response from server. Check your internet connection.';
        }
        else {
          message = `Unexpected error: ${error.status}`;
        }
      }

      toastService.show(message, 'error');
      return throwError((): HttpErrorResponse => error);
    })
  );
};
