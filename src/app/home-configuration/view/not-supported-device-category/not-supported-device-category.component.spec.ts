import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSupportedDeviceCategoryComponent } from './not-supported-device-category.component';

describe('NotSupportedDeviceCategoryComponent', () => {
  let component: NotSupportedDeviceCategoryComponent;
  let fixture: ComponentFixture<NotSupportedDeviceCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotSupportedDeviceCategoryComponent]
    });
    fixture = TestBed.createComponent(NotSupportedDeviceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
