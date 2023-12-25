import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Shade } from '../../models/shade';
import { ShadeAction } from '../../store/shade.action';
import { ShadeSelector } from '../../store/shade.selector';

@Component({
  selector: 'app-delete-shade-dialog',
  templateUrl: './delete-shade-dialog.component.html',
  styleUrls: ['./delete-shade-dialog.component.scss'],
})
export class DeleteShadeDialogComponent implements OnInit {
  deleteLoading$!: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<DeleteShadeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { shade: Shade },
    private store: Store
  ) {}

  ngOnInit(): void {
    this.deleteLoading$ = this.store.select(
      ShadeSelector.selectHandlingRequest
    );
  }

  deleteShade(): void {
    this.store.dispatch(
      ShadeAction.deleteShadeRequest({ shade: this.data.shade })
    );
  }
}
