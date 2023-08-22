import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHomeDialogComponent } from './delete-home-dialog.component';

describe('DeleteHomeDialogComponent', () => {
  let component: DeleteHomeDialogComponent;
  let fixture: ComponentFixture<DeleteHomeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHomeDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteHomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
