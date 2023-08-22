import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Floor } from 'src/app/home-configuration/models/floor';
import { HomeConfigurationAction } from 'src/app/home-configuration/store/home-configuration.action';
import { FloorItem } from 'src/app/home-configuration/store/home-configuration.reducer';
import { DeleteFloorDialogComponent } from '../delete-floor-dialog/delete-floor-dialog.component';

@Component({
  selector: 'app-floor-item',
  templateUrl: './floor-item.component.html',
  styleUrls: ['./floor-item.component.scss'],
})
export class FloorItemComponent implements OnInit {
  @Input()
  floor!: FloorItem;

  expand = true;
  floorNameFormGroup: FormGroup;
  roomNameFormGroup: FormGroup;
  addRoomFormVisible = false;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(private matDialog: MatDialog, private store: Store) {
    this.floorNameFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    this.roomNameFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.floorNameFormGroup.patchValue({ name: this.floor.name });
  }

  expandRoomList(): void {
    this.expand = true;
  }

  hideRoomList(): void {
    this.expand = false;
    this.addRoomFormVisible = false;
  }

  setEditMode(editMode: boolean): void {
    this.store.dispatch(
      HomeConfigurationAction.changeFloorItemEditMode({
        floorId: this.floor.id,
        editMode,
      })
    );
    if (editMode) {
      this.floorNameFormGroup.patchValue({ name: this.floor.name });
      return;
    }
  }

  openFloorOptionMenu() {
    this.trigger.openMenu();
    return false;
  }

  showAddRoomForm(): void {
    this.expand = true;
    this.addRoomFormVisible = true;
  }

  hideAddRoomForm(): void {
    this.addRoomFormVisible = false;
  }

  changeFloorName(): void {
    if (this.floorNameFormGroup.invalid) return;
    const { name } = this.floorNameFormGroup.value;
    if (name === this.floor.name) {
      this.store.dispatch(
        HomeConfigurationAction.changeFloorItemEditMode({
          floorId: this.floor.id,
          editMode: false,
        })
      );
      return;
    }
    this.store.dispatch(
      HomeConfigurationAction.editFloorRequest({
        floorId: this.floor.id,
        name,
        homeId: this.floor.homeId,
      })
    );
  }

  openDeleteFloorDialog(floor: Floor): void {
    this.matDialog.open(DeleteFloorDialogComponent, {
      width: '100%',
      disableClose: true,
      data: { floor },
    });
  }
}
