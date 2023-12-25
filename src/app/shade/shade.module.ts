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
import { ShadeRoutingModule } from './shade-routing.module';
import { ShadeEffects } from './store/shade.effect';
import { shadeFeatureKey, shadeReducer } from './store/shade.reducer';
import { ShadeOverviewComponent } from './view/shade-overview/shade-overview.component';
import { ShadeTileComponent } from './view/shade-tile/shade-tile.component';
import { AddShadeDialogComponent } from './view/add-shade-dialog/add-shade-dialog.component';
import { EditShadeDialogComponent } from './view/edit-shade-dialog/edit-shade-dialog.component';
import { DeleteShadeDialogComponent } from './view/delete-shade-dialog/delete-shade-dialog.component';

@NgModule({
  declarations: [ShadeOverviewComponent, ShadeTileComponent, AddShadeDialogComponent, EditShadeDialogComponent, DeleteShadeDialogComponent],
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
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ShadeRoutingModule,
    StoreModule.forFeature(shadeFeatureKey, shadeReducer),
    EffectsModule.forFeature([ShadeEffects]),
  ],
})
export class ShadeModule {}
