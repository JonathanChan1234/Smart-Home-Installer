import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoomDialogComponent } from './delete-room-dialog.component';

describe('DeleteRoomDialogComponent', () => {
  let component: DeleteRoomDialogComponent;
  let fixture: ComponentFixture<DeleteRoomDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRoomDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
