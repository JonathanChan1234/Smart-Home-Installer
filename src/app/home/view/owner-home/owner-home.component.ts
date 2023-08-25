import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Home } from '../../models/home';
import { HomeAction } from '../../store/home.action';
import { HomeStatus } from '../../store/home.reducer';
import { HomeSelector } from '../../store/home.selector';
import { CreateHomeDialogComponent } from '../create-home-dialog/create-home-dialog.component';
import { DeleteHomeDialogComponent } from '../delete-home-dialog/delete-home-dialog.component';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrls: ['./owner-home.component.scss'],
})
export class OwnerHomeComponent implements OnInit {
  home$!: Observable<Home[]>;
  status$!: Observable<HomeStatus>;
  error$!: Observable<string | undefined>;
  homeStatus = HomeStatus;

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.home$ = this.store.select(HomeSelector.selectOwnerHome);
    this.status$ = this.store.select(HomeSelector.selectFetchOwnerHomeStatus);
    this.error$ = this.store.select(HomeSelector.selectFetchOwnerHomeError);
    this.store.dispatch(HomeAction.fetchOwnerHomeList());
  }

  openCreateHomeDialog(): void {
    this.store.dispatch(HomeAction.ownerCreateHomeInit());
    this.dialog.open(CreateHomeDialogComponent, {
      width: '100%',
      disableClose: true,
    });
  }

  navigateToHomeConfiguration(home: Home): void {
    this.router.navigate([`home/${home.id}/configuration`]);
  }

  openEditHomeDialog(home: Home): void {
    this.store.dispatch(HomeAction.ownerCreateHomeInit());
    this.dialog.open(CreateHomeDialogComponent, {
      width: '100%',
      data: { home },
      disableClose: true,
    });
  }

  openDeleteHomeDialog(home: Home): void {
    this.store.dispatch(HomeAction.ownerDeleteHomeInit());
    this.dialog.open(DeleteHomeDialogComponent, {
      width: '100%',
      data: { home },
      disableClose: true,
    });
  }

  stopEvent(event: Event): void {
    event.stopPropagation();
  }
}
