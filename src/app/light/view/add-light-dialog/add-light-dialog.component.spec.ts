import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLightDialogComponent } from './add-light-dialog.component';

describe('AddLightDialogComponent', () => {
  let component: AddLightDialogComponent;
  let fixture: ComponentFixture<AddLightDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLightDialogComponent]
    });
    fixture = TestBed.createComponent(AddLightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
