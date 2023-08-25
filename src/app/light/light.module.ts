import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { LightRoutingModule } from './light-routing.module';
import { LightEffects } from './store/light.effect';
import { lightFeatureKey, lightReducer } from './store/light.reducer';
import { AddLightDialogComponent } from './view/add-light-dialog/add-light-dialog.component';
import { LightOverviewComponent } from './view/light-overview/light-overview.component';
import { LightTileComponent } from './view/light-tile/light-tile.component';

@NgModule({
  declarations: [
    LightOverviewComponent,
    LightTileComponent,
    AddLightDialogComponent,
  ],
  imports: [
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    LightRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forFeature(lightFeatureKey, lightReducer),
    EffectsModule.forFeature([LightEffects]),
  ],
})
export class LightModule {}
