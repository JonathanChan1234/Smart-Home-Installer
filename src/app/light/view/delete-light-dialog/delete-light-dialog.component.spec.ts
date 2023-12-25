import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLightDialogComponent } from './delete-light-dialog.component';

describe('DeleteLightDialogComponent', () => {
  let component: DeleteLightDialogComponent;
  let fixture: ComponentFixture<DeleteLightDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteLightDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteLightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
