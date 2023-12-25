import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Light } from '../../models/light';
import { LightAction } from '../../store/light.action';
import { LightSelector } from '../../store/light.selector';

@Component({
  selector: 'app-delete-light-dialog',
  templateUrl: './delete-light-dialog.component.html',
  styleUrls: ['./delete-light-dialog.component.scss'],
})
export class DeleteLightDialogComponent implements OnInit {
  deleteLoading$!: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<DeleteLightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { light: Light },
    private store: Store
  ) {}

  ngOnInit(): void {
    this.deleteLoading$ = this.store.select(
      LightSelector.selectHandlingRequest
    );
  }

  deleteLight(): void {
    this.store.dispatch(
      LightAction.deleteLightRequest({ light: this.data.light })
    );
  }
}
