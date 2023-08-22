import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Home } from '../../models/home';
import { HomeAction } from '../../store/home.action';
import { HomeStatus } from '../../store/home.reducer';
import { HomeSelector } from '../../store/home.selector';

@Component({
  selector: 'app-create-home-dialog',
  templateUrl: './create-home-dialog.component.html',
  styleUrls: ['./create-home-dialog.component.scss'],
})
export class CreateHomeDialogComponent implements OnInit {
  formGroup: FormGroup;
  status$!: Observable<HomeStatus>;
  error$!: Observable<string | undefined>;
  homeStatus = HomeStatus;

  constructor(
    public dialogRef: MatDialogRef<CreateHomeDialogComponent>,
    private store: Store,
    @Inject(DIALOG_DATA) public data?: { home: Home }
  ) {
    const home = this.data?.home;
    this.formGroup = new FormGroup({
      name: new FormControl(home?.name ?? '', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      description: new FormControl(home?.description ?? '', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      userPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      installerPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
  }
  ngOnInit(): void {
    this.status$ = this.store.select(HomeSelector.selectCreateHomeStatus);
    this.error$ = this.store.select(HomeSelector.selectCreateHomeError);
  }

  submit(): void {
    if (this.formGroup.invalid) return;
    const { name, description, userPassword, installerPassword } =
      this.formGroup.value;

    const home = this.data?.home;
    const dto = { name, description, userPassword, installerPassword };
    if (home) {
      this.store.dispatch(HomeAction.ownerEditHome({ id: home.id, dto }));
      return;
    }
    this.store.dispatch(HomeAction.ownerCreateHome({ dto }));
  }

  closeDialog(): void {
    this.store.dispatch(HomeAction.ownerCreateHomeInit());
    this.dialogRef.close();
  }
}
