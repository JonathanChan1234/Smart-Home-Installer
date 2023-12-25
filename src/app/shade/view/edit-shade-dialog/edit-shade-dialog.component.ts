import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Room } from 'src/app/home-configuration/models/room';
import { HomeConfigurationSelector } from 'src/app/home-configuration/store/home-configuration.selector';
import { Shade } from '../../models/shade';
import { ShadeAction } from '../../store/shade.action';
import { ShadeSelector } from '../../store/shade.selector';

@Component({
  selector: 'app-edit-shade-dialog',
  templateUrl: './edit-shade-dialog.component.html',
  styleUrls: ['./edit-shade-dialog.component.scss'],
})
export class EditShadeDialogComponent implements OnInit {
  formGroup: FormGroup;
  rooms$!: Observable<Room[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | undefined>;

  constructor(
    private store: Store,
    public matDialogRef: MatDialogRef<EditShadeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { shade: Shade }
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl(this.data.shade.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      roomId: new FormControl(this.data.shade.roomId, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.rooms$ = this.store.select(HomeConfigurationSelector.selectRooms);
    this.loading$ = this.store.select(ShadeSelector.selectHandlingRequest);
    this.error$ = this.store.select(ShadeSelector.selectRequestError);
  }

  submit(): void {
    if (this.formGroup.invalid) return;
    const { name, roomId } = this.formGroup.value;
    this.store.dispatch(
      ShadeAction.editShadeRequest({ shade: this.data.shade, name, roomId })
    );
  }
}
