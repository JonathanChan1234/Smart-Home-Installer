import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeConfigurationComponent } from './view/home-configuration/home-configuration.component';

const routes: Routes = [{ path: '', component: HomeConfigurationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeConfigurationRoutingModule {}
