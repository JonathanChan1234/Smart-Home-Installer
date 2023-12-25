import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeTileComponent } from './shade-tile.component';

describe('ShadeTileComponent', () => {
  let component: ShadeTileComponent;
  let fixture: ComponentFixture<ShadeTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShadeTileComponent]
    });
    fixture = TestBed.createComponent(ShadeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
