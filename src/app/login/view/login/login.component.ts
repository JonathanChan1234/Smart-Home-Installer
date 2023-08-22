import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { LoginAction } from '../../store/login.action';
import { LoginStatus } from '../../store/login.reducer';
import { LoginSelector } from '../../store/login.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  formGroup: FormGroup;

  constructor(private readonly store: Store, private readonly router: Router) {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.store
      .select(LoginSelector.selectLoginStatus)
      .pipe(switchMap((status) => of(status == LoginStatus.loading)));
  }

  submitForm(event: Event): void {
    event.preventDefault();
    const { username, password } = this.formGroup.value;
    if (this.formGroup.invalid) return;
    this.store.dispatch(LoginAction.loginSubmitted({ username, password }));
  }

  navigateToRegisterPage(): void {
    this.router.navigate(['register']);
  }
}
