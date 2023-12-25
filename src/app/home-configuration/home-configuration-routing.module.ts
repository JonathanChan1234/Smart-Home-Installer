import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeConfigurationComponent } from './view/home-configuration/home-configuration.component';
import { NotSupportedDeviceCategoryComponent } from './view/not-supported-device-category/not-supported-device-category.component';
import { RoomNotSelectedComponent } from './view/room-not-selected/room-not-selected.component';

const routes: Routes = [
  {
    path: '',
    component: HomeConfigurationComponent,
    children: [
      {
        path: '',
        component: RoomNotSelectedComponent,
      },
      {
        path: 'room/:roomId',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../device/device.module').then((m) => m.DeviceModule),
          },
          {
            path: 'light',
            loadChildren: () =>
              import('../light/light.module').then((m) => m.LightModule),
          },
          {
            path: 'shade',
            loadChildren: () =>
              import('../shade/shade.module').then((m) => m.ShadeModule),
          },
          {
            path: '**',
            component: NotSupportedDeviceCategoryComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeConfigurationRoutingModule {}
