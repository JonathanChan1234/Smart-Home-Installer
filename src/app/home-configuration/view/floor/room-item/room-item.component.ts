import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Room } from 'src/app/home-configuration/models/room';
import { HomeConfigurationAction } from 'src/app/home-configuration/store/home-configuration.action';
import { EditableType } from 'src/app/home-configuration/store/home-configuration.reducer';
import { HomeConfigurationSelector } from 'src/app/home-configuration/store/home-configuration.selector';
import { DeleteRoomDialogComponent } from '../delete-room-dialog/delete-room-dialog.component';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss'],
})
export class RoomItemComponent implements OnInit {
  @Input()
  room!: EditableType<Room>;

  homeId?: string | null;
  formGroup: FormGroup;
  currentRoomId$!: Observable<string | undefined>;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    this.route.paramMap.subscribe((params) => {
      this.homeId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.formGroup.patchValue({ name: this.room.name });
    this.currentRoomId$ = this.store.select(
      HomeConfigurationSelector.selectCurrentRoom
    );
  }

  openRoomOptionMenu(): boolean {
    if (this.room.editMode) return false;
    this.trigger.openMenu();
    return false;
  }

  changeRoomName() {
    if (!this.homeId) {
      this.matSnackBar.open('Missing home id', undefined, { duration: 3000 });
      return;
    }
    if (this.formGroup.invalid) return;
    const { name } = this.formGroup.value;
    this.store.dispatch(
      HomeConfigurationAction.editRoomRequest({
        homeId: this.homeId,
        room: this.room,
        name,
      })
    );
  }

  setEditMode(editMode: boolean): void {
    this.store.dispatch(
      HomeConfigurationAction.setRoomEditMode({ room: this.room, editMode })
    );
  }

  openDeleteRoomDialog(): void {
    if (!this.homeId) return;
    this.matDialog.open(DeleteRoomDialogComponent, {
      disableClose: true,
      width: '100%',
      data: { room: this.room, homeId: this.homeId },
    });
  }

  keyup() {
    console.log('key up');
  }

  navigateToDeviceOverview(): void {
    this.router.navigate([`room/${this.room.id}`], { relativeTo: this.route });
  }
}
