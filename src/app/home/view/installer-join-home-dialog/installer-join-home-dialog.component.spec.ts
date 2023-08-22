import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallerJoinHomeDialogComponent } from './installer-join-home-dialog.component';

describe('InstallerJoinHomeDialogComponent', () => {
  let component: InstallerJoinHomeDialogComponent;
  let fixture: ComponentFixture<InstallerJoinHomeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallerJoinHomeDialogComponent]
    });
    fixture = TestBed.createComponent(InstallerJoinHomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
