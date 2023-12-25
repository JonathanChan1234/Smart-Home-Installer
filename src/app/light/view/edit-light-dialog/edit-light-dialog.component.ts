import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Room } from 'src/app/home-configuration/models/room';
import { HomeConfigurationSelector } from 'src/app/home-configuration/store/home-configuration.selector';
import { Light } from '../../models/light';
import { LightSelector } from '../../store/light.selector';
import { LightAction } from '../../store/light.action';

@Component({
  selector: 'app-edit-light-dialog',
  templateUrl: './edit-light-dialog.component.html',
  styleUrls: ['./edit-light-dialog.component.scss'],
})
export class EditLightDialogComponent implements OnInit {
  formGroup: FormGroup;
  rooms$!: Observable<Room[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | undefined>;

  constructor(
    private store: Store,
    public matDialogRef: MatDialogRef<EditLightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { light: Light }
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl(this.data.light.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      roomId: new FormControl(this.data.light.roomId, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.rooms$ = this.store.select(HomeConfigurationSelector.selectRooms);
    this.loading$ = this.store.select(LightSelector.selectHandlingRequest);
    this.error$ = this.store.select(LightSelector.selectRequestError);
  }

  submit(): void {
    if (this.formGroup.invalid) return;
    const { name, roomId } = this.formGroup.value;
    this.store.dispatch(
      LightAction.editLightRequest({ light: this.data.light, name, roomId })
    );
  }
}
