import { Component } from '@angular/core';
import {InputForm} from '../../../shared/components/inputs/input-form/input-form';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthHttpService} from '../../../core/services/http/auth-http.service';
import {SessionService} from '../../../core/services/session/session.service';
import {RegisterUser} from '../../../core/models/user';
import {SessionData} from '../../../core/models/session-data';
import {TextBtn} from '../../../shared/components/buttons/text-btn/text-btn';
import {LoaderService} from '../../../core/services/components/loader-service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-register-form',
  imports: [
    InputForm,
    ReactiveFormsModule,
    RouterLink,
    TextBtn
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {
  form: FormGroup = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(64)]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)]
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(64)]
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(64)]
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(128)]
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
    },
    firstName: {
      required: 'First name is required.',
      maxlength: 'The first name must be less than 64 characters.'
    },
    lastName: {
      required: 'First name is required.',
      maxlength: 'The first name must be less than 64 characters.'
    },
    phone: {
      required: 'Phone is required.',
      minlength: 'The phone must be 9 characters.',
      maxlength: 'The phone must be 9 characters.'
    },
    address: {
      required: 'Address is required.',
      maxlength: 'The address must be less than 64 characters.'
    }
  };

  constructor(private authHttpService: AuthHttpService,
              private sessionService: SessionService,
              private router: Router,
              protected loaderService: LoaderService) {
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

    const body: RegisterUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      address: this.form.value.address
    }

    this.authHttpService.register(body)
      .pipe(finalize((): void => {
        this.loaderService.hide();
      }))
      .subscribe({
        next: (response: SessionData): void => {
          this.sessionService.setData(response);
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
