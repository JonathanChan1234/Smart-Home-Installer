import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegisterAction } from '../../store/register.action';
import { RegisterSelector } from '../../store/register.selector';

const PasswordValidator: ValidatorFn = (fg) => {
  const password = fg.get('password')?.value;
  const confirmPassword = fg.get('confirmPassword')?.value;
  return password && confirmPassword && password === confirmPassword
    ? null
    : {
        password: 'Not Identical to Confirm Password',
        confirmPassword: 'Not Identical to Password',
      };
};

class ConfirmPasswordErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control?.parent?.invalid && control?.touched);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formGroup: FormGroup;
  confirmPasswordErrorMatcher: ConfirmPasswordErrorMatcher;
  isLoading$!: Observable<boolean>;

  constructor(private router: Router, private store: Store) {
    this.confirmPasswordErrorMatcher = new ConfirmPasswordErrorMatcher();
    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-zA-z]).{8,30}$/),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: PasswordValidator }
    );
    this.isLoading$ = this.store.select(RegisterSelector.selectIsLoading);
  }

  register() {
    if (this.formGroup.invalid) return;
    const { email, username, password } = this.formGroup.value;
    this.store.dispatch(
      RegisterAction.registerSubmitted({ email, username, password })
    );
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }
}
