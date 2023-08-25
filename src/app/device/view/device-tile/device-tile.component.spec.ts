import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTileComponent } from './device-tile.component';

describe('DeviceTileComponent', () => {
  let component: DeviceTileComponent;
  let fixture: ComponentFixture<DeviceTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceTileComponent]
    });
    fixture = TestBed.createComponent(DeviceTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
