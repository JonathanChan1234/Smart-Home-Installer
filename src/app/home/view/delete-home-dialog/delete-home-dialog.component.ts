import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Home } from '../../models/home';
import { HomeAction } from '../../store/home.action';
import { HomeStatus } from '../../store/home.reducer';
import { HomeSelector } from '../../store/home.selector';

@Component({
  selector: 'app-delete-home-dialog',
  templateUrl: './delete-home-dialog.component.html',
  styleUrls: ['./delete-home-dialog.component.scss'],
})
export class DeleteHomeDialogComponent implements OnInit {
  status$!: Observable<HomeStatus>;
  homeStatus = HomeStatus;

  constructor(
    public dialogRef: MatDialogRef<DeleteHomeDialogComponent>,
    @Inject(DIALOG_DATA) public data: { home: Home },
    private store: Store
  ) {}

  ngOnInit(): void {
    this.status$ = this.store.select(HomeSelector.selectDeleteHomeStatus);
  }

  deleteHome(): void {
    this.store.dispatch(HomeAction.ownerDeleteHome({ id: this.data.home.id }));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
