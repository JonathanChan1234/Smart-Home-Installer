import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceOverviewComponent } from './device-overview.component';

describe('DeviceOverviewComponent', () => {
  let component: DeviceOverviewComponent;
  let fixture: ComponentFixture<DeviceOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceOverviewComponent]
    });
    fixture = TestBed.createComponent(DeviceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
