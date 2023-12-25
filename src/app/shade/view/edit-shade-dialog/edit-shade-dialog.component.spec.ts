import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShadeDialogComponent } from './edit-shade-dialog.component';

describe('EditShadeDialogComponent', () => {
  let component: EditShadeDialogComponent;
  let fixture: ComponentFixture<EditShadeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditShadeDialogComponent]
    });
    fixture = TestBed.createComponent(EditShadeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
