import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeOverviewComponent } from './shade-overview.component';

describe('ShadeOverviewComponent', () => {
  let component: ShadeOverviewComponent;
  let fixture: ComponentFixture<ShadeOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShadeOverviewComponent]
    });
    fixture = TestBed.createComponent(ShadeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
