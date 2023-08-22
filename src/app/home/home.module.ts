import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeEffects } from './store/home.effect';
import { homeFeatureKey, homeReducer } from './store/home.reducer';
import { CreateHomeDialogComponent } from './view/create-home-dialog/create-home-dialog.component';
import { DeleteHomeDialogComponent } from './view/delete-home-dialog/delete-home-dialog.component';
import { HomeComponent } from './view/home/home.component';
import { InstallerHomeComponent } from './view/installer-home/installer-home.component';
import { OwnerHomeComponent } from './view/owner-home/owner-home.component';
import { InstallerJoinHomeDialogComponent } from './view/installer-join-home-dialog/installer-join-home-dialog.component';
import { InstallerRemoveHomeDialogComponent } from './view/installer-remove-home-dialog/installer-remove-home-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    InstallerHomeComponent,
    OwnerHomeComponent,
    CreateHomeDialogComponent,
    DeleteHomeDialogComponent,
    InstallerJoinHomeDialogComponent,
    InstallerRemoveHomeDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    SharedModule,
    StoreModule.forFeature(homeFeatureKey, homeReducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
})
export class HomeModule {}
