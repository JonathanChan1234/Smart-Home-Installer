import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LightAction } from '../../store/light.action';
import { LightSelector } from '../../store/light.selector';

@Component({
  selector: 'app-add-light-dialog',
  templateUrl: './add-light-dialog.component.html',
  styleUrls: ['./add-light-dialog.component.scss'],
})
export class AddLightDialogComponent implements OnInit {
  formGroup: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<string | undefined>;

  constructor(
    public matDialogRef: MatDialogRef<AddLightDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: string }
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      subCategory: new FormControl('Light Switch', [Validators.required]),
      dimmable: new FormControl(false),
      hasColorTemperature: new FormControl(false),
    });
  }
  ngOnInit(): void {
    this.loading$ = this.store.select(LightSelector.selectHandlingRequest);
    this.error$ = this.store.select(LightSelector.selectRequestError);
  }

  submit() {
    if (this.formGroup.invalid) return;
    const { name, subCategory, dimmable, hasColorTemperature } =
      this.formGroup.value;
    this.store.dispatch(
      LightAction.addLightRequest({
        dto: {
          roomId: this.data.roomId,
          name: name,
          subCategory: subCategory,
          capabilities: {
            dimmable,
            hasColorTemperature,
          },
        },
      })
    );
  }
}
