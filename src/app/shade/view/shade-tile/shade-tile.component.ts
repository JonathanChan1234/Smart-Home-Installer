import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Shade } from '../../models/shade';
import { DeleteShadeDialogComponent } from '../delete-shade-dialog/delete-shade-dialog.component';
import { EditShadeDialogComponent } from '../edit-shade-dialog/edit-shade-dialog.component';

@Component({
  selector: 'app-shade-tile',
  templateUrl: './shade-tile.component.html',
  styleUrls: ['./shade-tile.component.scss'],
})
export class ShadeTileComponent {
  @Input()
  shade!: Shade;

  constructor(private matDialog: MatDialog) {}

  openEditShadeDialog() {
    this.matDialog.open(EditShadeDialogComponent, {
      disableClose: true,
      width: '100%',
      data: { shade: this.shade },
    });
  }

  openDeleteShadeDialog() {
    this.matDialog.open(DeleteShadeDialogComponent, {
      disableClose: true,
      width: '100%',
      data: { shade: this.shade },
    });
  }
}
