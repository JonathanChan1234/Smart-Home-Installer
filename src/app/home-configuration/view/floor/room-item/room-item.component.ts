import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Room } from 'src/app/home-configuration/models/room';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss'],
})
export class RoomItemComponent {
  @Input()
  room!: Room;

  formGroup: FormGroup;
  editMode = false;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  openRoomOptionMenu(): boolean {
    this.trigger.openMenu();
    return false;
  }

  changeRoomName() {
    //TODO: Change room name
  }

  setEditMode(mode: boolean): void {
    this.editMode = mode;
    if (!mode) return;
    this.formGroup.patchValue({ name: this.room.name });
  }
}
