import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomNotSelectedComponent } from './room-not-selected.component';

describe('RoomNotSelectedComponent', () => {
  let component: RoomNotSelectedComponent;
  let fixture: ComponentFixture<RoomNotSelectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomNotSelectedComponent]
    });
    fixture = TestBed.createComponent(RoomNotSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
