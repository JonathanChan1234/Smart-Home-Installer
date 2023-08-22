import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Floor } from 'src/app/home-configuration/models/floor';
import {
  EditableType,
  FloorItem,
  HomeConfigurationFloorStatus,
} from 'src/app/home-configuration/store/home-configuration.reducer';
import { Room } from '../../../models/room';
import { HomeConfigurationAction } from '../../../store/home-configuration.action';
import { HomeConfigurationSelector } from '../../../store/home-configuration.selector';

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.scss'],
})
export class FloorListComponent implements OnInit {
  status$!: Observable<HomeConfigurationFloorStatus>;
  error$!: Observable<string | undefined>;
  floors$!: Observable<FloorItem[]>;
  editMode$!: Observable<boolean>;

  addFloorLoading$!: Observable<boolean>;

  floorStatus = HomeConfigurationFloorStatus;
  formGroup: FormGroup;
  homeId: string | null = null;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.status$ = this.store.select(
      HomeConfigurationSelector.selectFloorListStatus
    );
    this.error$ = this.store.select(
      HomeConfigurationSelector.selectFloorListError
    );
    this.floors$ = this.store.select(HomeConfigurationSelector.selectFloors);
    this.editMode$ = this.store.select(
      HomeConfigurationSelector.selectFloorListEditMode
    );
    this.addFloorLoading$ = this.store.select(
      HomeConfigurationSelector.selectAddFloorLoading
    );
    this.route.paramMap.subscribe((route) => {
      const homeId = route.get('id');
      this.homeId = homeId;
      if (!homeId) {
        this.store.dispatch(
          HomeConfigurationAction.fetchHomeFloorFailure({
            error: 'Missing home id',
          })
        );
        return;
      }
      this.store.dispatch(HomeConfigurationAction.fetchHomeFloor({ homeId }));
    });
  }

  toFloorIdList(floors: Floor[]) {
    return floors.map((floor) => floor.id);
  }

  setEditMode(editMode: boolean) {
    this.store.dispatch(
      HomeConfigurationAction.changeFloorListEditMode({ editMode })
    );
  }

  addFloor() {
    if (this.formGroup.invalid) return;
    if (!this.homeId) {
      this.store.dispatch(
        HomeConfigurationAction.addFloorFailure({ error: 'Missing home id' })
      );
      return;
    }
    const { name } = this.formGroup.value;
    this.store.dispatch(
      HomeConfigurationAction.addFloorRequest({ homeId: this.homeId, name })
    );
  }

  drop(event: CdkDragDrop<EditableType<Room>[]>) {
    if (event.previousContainer === event.container) return;

    const room = event.previousContainer.data[event.previousIndex];
    const transferToFloor = event.container.id;
    console.log(
      `room ${room.name} is transferred to floor id ${transferToFloor}`
    );

    this.store.dispatch(
      HomeConfigurationAction.changeRoomFloor({
        roomId: room.id,
        oldFloorId: event.previousContainer.id,
        newFloorId: event.container.id,
      })
    );
  }
}
