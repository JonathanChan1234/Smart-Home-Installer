import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLightDialogComponent } from './edit-light-dialog.component';

describe('EditLightDialogComponent', () => {
  let component: EditLightDialogComponent;
  let fixture: ComponentFixture<EditLightDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLightDialogComponent]
    });
    fixture = TestBed.createComponent(EditLightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
