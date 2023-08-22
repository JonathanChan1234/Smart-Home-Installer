import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallerRemoveHomeDialogComponent } from './installer-remove-home-dialog.component';

describe('InstallerRemoveHomeDialogComponent', () => {
  let component: InstallerRemoveHomeDialogComponent;
  let fixture: ComponentFixture<InstallerRemoveHomeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallerRemoveHomeDialogComponent]
    });
    fixture = TestBed.createComponent(InstallerRemoveHomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
