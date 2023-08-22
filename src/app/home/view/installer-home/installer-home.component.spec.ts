import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallerHomeComponent } from './installer-home.component';

describe('InstallerHomeComponent', () => {
  let component: InstallerHomeComponent;
  let fixture: ComponentFixture<InstallerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallerHomeComponent]
    });
    fixture = TestBed.createComponent(InstallerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
