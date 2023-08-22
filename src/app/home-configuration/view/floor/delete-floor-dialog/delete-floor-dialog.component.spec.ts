import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFloorDialogComponent } from './delete-floor-dialog.component';

describe('DeleteFloorDialogComponent', () => {
  let component: DeleteFloorDialogComponent;
  let fixture: ComponentFixture<DeleteFloorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFloorDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteFloorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
