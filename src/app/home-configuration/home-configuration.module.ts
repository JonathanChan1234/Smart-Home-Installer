import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { HomeConfigurationRoutingModule } from './home-configuration-routing.module';
import { HomeConfigurationEffects } from './store/home-configuration.effect';
import {
  homeConfigurationFeatureKey,
  homeConfigurationReducer,
} from './store/home-configuration.reducer';
import { DeleteFloorDialogComponent } from './view/floor/delete-floor-dialog/delete-floor-dialog.component';
import { DeleteRoomDialogComponent } from './view/floor/delete-room-dialog/delete-room-dialog.component';
import { FloorItemComponent } from './view/floor/floor-item/floor-item.component';
import { FloorListComponent } from './view/floor/floor-list/floor-list.component';
import { RoomItemComponent } from './view/floor/room-item/room-item.component';
import { HomeConfigurationComponent } from './view/home-configuration/home-configuration.component';
import { RoomNotSelectedComponent } from './view/room-not-selected/room-not-selected.component';
import { NotSupportedDeviceCategoryComponent } from './view/not-supported-device-category/not-supported-device-category.component';

@NgModule({
  declarations: [
    HomeConfigurationComponent,
    FloorListComponent,
    FloorItemComponent,
    RoomItemComponent,
    DeleteFloorDialogComponent,
    DeleteRoomDialogComponent,
    RoomNotSelectedComponent,
    NotSupportedDeviceCategoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HomeConfigurationRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    CdkDropList,
    CdkDrag,
    StoreModule.forFeature(
      homeConfigurationFeatureKey,
      homeConfigurationReducer
    ),
    EffectsModule.forFeature([HomeConfigurationEffects]),
  ],
})
export class HomeConfigurationModule {}
