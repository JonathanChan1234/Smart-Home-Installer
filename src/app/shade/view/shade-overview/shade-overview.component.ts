import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Shade } from '../../models/shade';
import { ShadeAction } from '../../store/shade.action';
import { ShadeStatus } from '../../store/shade.reducer';
import { ShadeSelector } from '../../store/shade.selector';
import { AddShadeDialogComponent } from '../add-shade-dialog/add-shade-dialog.component';

@Component({
  selector: 'app-shade-overview',
  templateUrl: './shade-overview.component.html',
  styleUrls: ['./shade-overview.component.scss'],
})
export class ShadeOverviewComponent implements OnInit {
  shades$!: Observable<Shade[]>;
  status$!: Observable<ShadeStatus>;
  error$!: Observable<string | undefined>;
  shadeStatus = ShadeStatus;
  roomId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.shades$ = this.store.select(ShadeSelector.selectShades);
    this.status$ = this.store.select(ShadeSelector.selectShadeStatus);
    this.error$ = this.store.select(ShadeSelector.selectError);
    this.route.paramMap.subscribe((params) => {
      this.roomId = params.get('roomId');
      if (!this.roomId) {
        this.store.dispatch(
          ShadeAction.fetchShadeFailure({ error: 'Missing room id' })
        );
        return;
      }
      this.store.dispatch(
        ShadeAction.fetchShadeRequest({ roomId: this.roomId })
      );
    });
  }

  openAddShadeDialog() {
    this.matDialog.open(AddShadeDialogComponent, {
      disableClose: true,
      width: '100%',
      data: { roomId: this.roomId },
    });
  }
}
