import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingViewComponent } from './loading-view.component';

describe('LoadingViewComponent', () => {
  let component: LoadingViewComponent;
  let fixture: ComponentFixture<LoadingViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingViewComponent]
    });
    fixture = TestBed.createComponent(LoadingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
