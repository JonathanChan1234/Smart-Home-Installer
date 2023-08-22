import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHomeDialogComponent } from './create-home-dialog.component';

describe('CreateHomeDialogComponent', () => {
  let component: CreateHomeDialogComponent;
  let fixture: ComponentFixture<CreateHomeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHomeDialogComponent]
    });
    fixture = TestBed.createComponent(CreateHomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
