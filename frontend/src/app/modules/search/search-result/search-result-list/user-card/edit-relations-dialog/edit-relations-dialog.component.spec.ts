import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRelationsDialogComponent } from './edit-relations-dialog.component';

describe('EditRelationsDialogComponent', () => {
  let component: EditRelationsDialogComponent;
  let fixture: ComponentFixture<EditRelationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRelationsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRelationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
