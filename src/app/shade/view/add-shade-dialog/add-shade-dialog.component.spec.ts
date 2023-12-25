import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShadeDialogComponent } from './add-shade-dialog.component';

describe('AddShadeDialogComponent', () => {
  let component: AddShadeDialogComponent;
  let fixture: ComponentFixture<AddShadeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddShadeDialogComponent]
    });
    fixture = TestBed.createComponent(AddShadeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
