import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorItemComponent } from './floor-item.component';

describe('FloorItemComponent', () => {
  let component: FloorItemComponent;
  let fixture: ComponentFixture<FloorItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorItemComponent]
    });
    fixture = TestBed.createComponent(FloorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
