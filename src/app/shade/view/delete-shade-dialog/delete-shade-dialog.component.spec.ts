import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShadeDialogComponent } from './delete-shade-dialog.component';

describe('DeleteShadeDialogComponent', () => {
  let component: DeleteShadeDialogComponent;
  let fixture: ComponentFixture<DeleteShadeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteShadeDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteShadeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
