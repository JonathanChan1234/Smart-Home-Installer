import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceOverviewComponent } from './view/device-overview/device-overview.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceOverviewComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule {}
