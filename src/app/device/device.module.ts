import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceEffects } from './store/device.effect';
import { deviceFeatureKey, deviceReducer } from './store/device.reducer';
import { DeviceOverviewComponent } from './view/device-overview/device-overview.component';
import { DeviceTileComponent } from './view/device-tile/device-tile.component';

@NgModule({
  declarations: [DeviceOverviewComponent, DeviceTileComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    SharedModule,
    MatIconModule,
    StoreModule.forFeature(deviceFeatureKey, deviceReducer),
    EffectsModule.forFeature([DeviceEffects]),
  ],
})
export class DeviceModule {}
