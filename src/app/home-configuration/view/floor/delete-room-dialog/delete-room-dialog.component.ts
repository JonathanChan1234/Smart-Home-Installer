import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Room } from 'src/app/home-configuration/models/room';
import { HomeConfigurationAction } from 'src/app/home-configuration/store/home-configuration.action';
import { HomeConfigurationSelector } from 'src/app/home-configuration/store/home-configuration.selector';

@Component({
  selector: 'app-delete-room-dialog',
  templateUrl: './delete-room-dialog.component.html',
  styleUrls: ['./delete-room-dialog.component.scss'],
})
export class DeleteRoomDialogComponent implements OnInit {
  deleteLoading$!: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<DeleteRoomDialogComponent>,
    @Inject(DIALOG_DATA) public data: { homeId: string; room: Room },
    private store: Store
  ) {}

  ngOnInit(): void {
    this.deleteLoading$ = this.store.select(
      HomeConfigurationSelector.selectDeleteLoading
    );
  }

  deleteRoom(): void {
    this.store.dispatch(
      HomeConfigurationAction.deleteRoomRequest({
        homeId: this.data.homeId,
        room: this.data.room,
      })
    );
  }
}
