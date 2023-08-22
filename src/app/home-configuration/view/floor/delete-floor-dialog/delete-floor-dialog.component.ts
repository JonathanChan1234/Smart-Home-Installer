import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Floor } from 'src/app/home-configuration/models/floor';
import { HomeConfigurationAction } from 'src/app/home-configuration/store/home-configuration.action';
import { HomeConfigurationSelector } from 'src/app/home-configuration/store/home-configuration.selector';

@Component({
  selector: 'app-delete-floor-dialog',
  templateUrl: './delete-floor-dialog.component.html',
  styleUrls: ['./delete-floor-dialog.component.scss'],
})
export class DeleteFloorDialogComponent implements OnInit {
  deleteLoading$!: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<DeleteFloorDialogComponent>,
    @Inject(DIALOG_DATA) public data: { floor: Floor },
    private store: Store
  ) {}

  ngOnInit(): void {
    this.deleteLoading$ = this.store.select(
      HomeConfigurationSelector.selectDeleteLoading
    );
  }

  deleteHome(): void {
    this.store.dispatch(
      HomeConfigurationAction.deleteFloorRequest({
        homeId: this.data.floor.homeId,
        floorId: this.data.floor.id,
      })
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
