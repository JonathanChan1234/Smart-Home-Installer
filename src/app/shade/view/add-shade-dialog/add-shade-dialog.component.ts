import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShadeAction } from '../../store/shade.action';
import { ShadeSelector } from '../../store/shade.selector';

@Component({
  selector: 'app-add-shade-dialog',
  templateUrl: './add-shade-dialog.component.html',
  styleUrls: ['./add-shade-dialog.component.scss'],
})
export class AddShadeDialogComponent implements OnInit {
  formGroup: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<string | undefined>;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: string },
    public matDialogRef: MatDialogRef<AddShadeDialogComponent>
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      subCategory: new FormControl('RollerShade', [Validators.required]),
      hasLevel: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(ShadeSelector.selectHandlingRequest);
    this.error$ = this.store.select(ShadeSelector.selectRequestError);
  }

  submit(): void {
    if (this.formGroup.invalid) return;
    const { name, subCategory, hasLevel } = this.formGroup.value;
    this.store.dispatch(
      ShadeAction.addShadeRequest({
        dto: {
          roomId: this.data.roomId,
          name,
          subCategory,
          capabilities: { hasLevel },
        },
      })
    );
  }
}
