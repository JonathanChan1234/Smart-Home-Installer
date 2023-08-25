import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceCount } from '../../models/device-count';
import { DeviceAction } from '../../store/device.action';
import { DeviceStatus } from '../../store/device.reducer';
import { DeviceSelector } from '../../store/device.selector';

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.scss'],
})
export class DeviceOverviewComponent implements OnInit {
  roomId: string | null = null;
  status$!: Observable<DeviceStatus>;
  error$!: Observable<string | undefined>;
  deviceCount$!: Observable<DeviceCount[]>;
  deviceStatus = DeviceStatus;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roomId = params.get('roomId');
      if (!this.roomId) {
        this.store.dispatch(
          DeviceAction.fetchDeviceCountFailure({
            error: 'Missing room id. Please check if your url is valid',
          })
        );
        return;
      }
      this.store.dispatch(
        DeviceAction.fetchDeviceCountRequest({
          roomId: this.roomId,
        })
      );
    });

    this.status$ = this.store.select(DeviceSelector.selectDeviceStatus);
    this.error$ = this.store.select(DeviceSelector.selectError);
    this.deviceCount$ = this.store.select(DeviceSelector.selectDeviceCount);
  }
}
