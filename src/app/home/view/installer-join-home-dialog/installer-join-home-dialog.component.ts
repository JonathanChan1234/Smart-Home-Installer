import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HomeAction } from '../../store/home.action';
import { HomeSelector } from '../../store/home.selector';

@Component({
  selector: 'app-installer-join-home-dialog',
  templateUrl: './installer-join-home-dialog.component.html',
  styleUrls: ['./installer-join-home-dialog.component.scss'],
})
export class InstallerJoinHomeDialogComponent implements OnInit {
  loading$!: Observable<boolean>;
  error$!: Observable<string | undefined>;
  formGroup: FormGroup;

  constructor(
    private store: Store,
    private matDialogRef: MatDialogRef<InstallerJoinHomeDialogComponent>
  ) {
    this.formGroup = new FormGroup({
      homeId: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
        ),
      ]),
      installerPassword: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.loading$ = this.store.select(
      HomeSelector.selectInstallerJoinHomeLoading
    );
    this.error$ = this.store.select(HomeSelector.selectInstallerJoinHomeError);
  }

  submit(): void {
    if (this.formGroup.invalid) return;
    const { homeId, installerPassword } = this.formGroup.value;
    this.store.dispatch(
      HomeAction.installerJoinHome({ id: homeId, password: installerPassword })
    );
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }
}
