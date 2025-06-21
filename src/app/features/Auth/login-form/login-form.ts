import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthHttpService} from '../../../core/services/http/auth-http.service';
import {SessionService} from '../../../core/services/session/session.service';
import {Router, RouterLink} from '@angular/router';
import {LoginUser} from '../../../core/models/user';
import {SessionData} from '../../../core/models/session-data';
import {InputForm} from '../../../shared/components/inputs/input-form/input-form';
import {TextBtn} from '../../../shared/components/buttons/text-btn/text-btn';
import {LoaderService} from '../../../core/services/components/loader-service';
import {finalize, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    InputForm,
    RouterLink,
    TextBtn
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  destroy$: Subject<void> = new Subject<void>();

  form: FormGroup = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(64)]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)]
    })
  });

  errorMessages: Record<string, Record<string, string>> = {
    email: {
      required: 'Email is required.',
      email: 'Enter a valid email.',
      maxlength: 'The email must be less than 64 characters.'
    },
    password: {
      required: 'Password is required.',
      minlength: 'The password must be at least 8 characters long.',
      maxlength: 'The password must be less than 64 characters.'
    }
  };

  constructor(private authHttpService: AuthHttpService,
              private sessionService: SessionService,
              private router: Router,
              protected loaderService: LoaderService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getErrorMessage(controlName: string): string {
    const control: any = this.form.get(controlName);
    if (control?.errors) {
      for (const error in control.errors) {
        if (this.errorMessages[controlName][error]) {
          return this.errorMessages[controlName][error];
        }
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loaderService.show();

    const body: LoginUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authHttpService.login(body)
      .pipe(finalize((): void => {
        this.loaderService.hide();
      }))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: SessionData): void => {
          this.sessionService.setData(response);
          this.router.navigate(['main/pets-dashboard']);
        }
      });
  }
}
