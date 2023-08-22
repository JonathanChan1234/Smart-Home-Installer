import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Home } from '../../models/home';
import { HomeAction } from '../../store/home.action';
import { HomeStatus } from '../../store/home.reducer';
import { HomeSelector } from '../../store/home.selector';
import { InstallerJoinHomeDialogComponent } from '../installer-join-home-dialog/installer-join-home-dialog.component';
import { InstallerRemoveHomeDialogComponent } from '../installer-remove-home-dialog/installer-remove-home-dialog.component';

@Component({
  selector: 'app-installer-home',
  templateUrl: './installer-home.component.html',
  styleUrls: ['./installer-home.component.scss'],
})
export class InstallerHomeComponent implements OnInit {
  home$!: Observable<Home[]>;
  status$!: Observable<HomeStatus>;
  error$!: Observable<string | undefined>;
  homeStatus = HomeStatus;

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.home$ = this.store.select(HomeSelector.selectInstallerHome);
    this.status$ = this.store.select(
      HomeSelector.selectFetchInstallerHomeStatus
    );
    this.error$ = this.store.select(HomeSelector.selectFetchInstallerHomeError);
    this.store.dispatch(HomeAction.fetchInstallerHomeList());
  }

  openJoinHomeDialog() {
    this.matDialog.open(InstallerJoinHomeDialogComponent, {
      width: '100%',
      disableClose: true,
    });
  }

  openRemoveHomeDialog(home: Home) {
    this.matDialog.open(InstallerRemoveHomeDialogComponent, {
      width: '100%',
      disableClose: true,
      data: { home },
    });
  }

  navigateToHomeConfiguration(home: Home) {
    this.router.navigate([`home/${home.id}/configuration`]);
  }

  stopEvent(event: Event): void {
    event.stopPropagation();
  }
}
