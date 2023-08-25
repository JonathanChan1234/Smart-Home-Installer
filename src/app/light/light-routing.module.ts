import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightOverviewComponent } from './view/light-overview/light-overview.component';

const routes: Routes = [
  {
    path: '',
    component: LightOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LightRoutingModule {}
