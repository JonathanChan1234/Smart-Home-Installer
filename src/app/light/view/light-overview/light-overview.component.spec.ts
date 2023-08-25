import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightOverviewComponent } from './light-overview.component';

describe('LightOverviewComponent', () => {
  let component: LightOverviewComponent;
  let fixture: ComponentFixture<LightOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LightOverviewComponent]
    });
    fixture = TestBed.createComponent(LightOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
