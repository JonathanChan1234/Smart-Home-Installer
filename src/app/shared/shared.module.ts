import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ErrorViewComponent } from './error-view/error-view.component';
import { InitialViewComponent } from './initial-view/initial-view.component';
import { LoadingViewComponent } from './loading-view/loading-view.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';

@NgModule({
  declarations: [
    InitialViewComponent,
    LoadingViewComponent,
    ErrorViewComponent,
    TopToolbarComponent,
  ],
  exports: [
    InitialViewComponent,
    LoadingViewComponent,
    ErrorViewComponent,
    TopToolbarComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
  ],
})
export class SharedModule {}
