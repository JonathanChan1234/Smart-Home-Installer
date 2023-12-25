import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Light } from '../../models/light';
import { DeleteLightDialogComponent } from '../delete-light-dialog/delete-light-dialog.component';
import { EditLightDialogComponent } from '../edit-light-dialog/edit-light-dialog.component';

@Component({
  selector: 'app-light-tile',
  templateUrl: './light-tile.component.html',
  styleUrls: ['./light-tile.component.scss'],
})
export class LightTileComponent {
  @Input()
  light!: Light;

  constructor(private matDialog: MatDialog) {}

  openEditLightDialog(): void {
    this.matDialog.open(EditLightDialogComponent, {
      disableClose: true,
      width: '100%',
      data: { light: this.light },
    });
  }

  openDeleteLightDialog(): void {
    this.matDialog.open(DeleteLightDialogComponent, {
      disableClose: true,
      width: '100%',
      data: { light: this.light },
    });
  }
}
