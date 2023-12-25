import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShadeOverviewComponent } from './view/shade-overview/shade-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ShadeOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShadeRoutingModule {}
