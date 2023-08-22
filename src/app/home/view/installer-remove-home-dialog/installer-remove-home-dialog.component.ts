import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Home } from '../../models/home';
import { HomeAction } from '../../store/home.action';
import { HomeSelector } from '../../store/home.selector';

@Component({
  selector: 'app-installer-remove-home-dialog',
  templateUrl: './installer-remove-home-dialog.component.html',
  styleUrls: ['./installer-remove-home-dialog.component.scss'],
})
export class InstallerRemoveHomeDialogComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(
    private matDialogRef: MatDialogRef<InstallerRemoveHomeDialogComponent>,
    @Inject(DIALOG_DATA) public data: { home: Home },
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(
      HomeSelector.selectInstallerRemoveHomeLoading
    );
  }

  confirm(): void {
    this.store.dispatch(
      HomeAction.installerRemoveHome({ id: this.data.home.id })
    );
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }
}
