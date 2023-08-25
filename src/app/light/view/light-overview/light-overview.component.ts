import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Light } from '../../models/light';
import { LightAction } from '../../store/light.action';
import { LightStatus } from '../../store/light.reducer';
import { LightSelector } from '../../store/light.selector';
import { AddLightDialogComponent } from '../add-light-dialog/add-light-dialog.component';

@Component({
  selector: 'app-light-overview',
  templateUrl: './light-overview.component.html',
  styleUrls: ['./light-overview.component.scss'],
})
export class LightOverviewComponent implements OnInit {
  roomId!: string | null;
  lights$!: Observable<Light[]>;
  status$!: Observable<LightStatus>;
  error$!: Observable<string | undefined>;
  lightStatus = LightStatus;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.lights$ = this.store.select(LightSelector.selectLights);
    this.status$ = this.store.select(LightSelector.selectLightStatus);
    this.error$ = this.store.select(LightSelector.selectError);

    this.route.paramMap.subscribe((params) => {
      this.roomId = params.get('roomId');
      if (!this.roomId) {
        this.store.dispatch(
          LightAction.fetchLightFailure({ error: 'Missing room ID' })
        );
        return;
      }
      this.store.dispatch(
        LightAction.fetchLightRequest({ roomId: this.roomId })
      );
    });
  }

  openAddLightDialog() {
    this.matDialog.open(AddLightDialogComponent, {
      disableClose: true,
      width: '100%',
      data: { roomId: this.roomId },
    });
  }
}
