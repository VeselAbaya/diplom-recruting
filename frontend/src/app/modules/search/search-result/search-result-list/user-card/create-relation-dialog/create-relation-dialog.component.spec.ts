import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRelationDialogComponent } from './create-relation-dialog.component';

describe('CreateRelationDialogComponent', () => {
  let component: CreateRelationDialogComponent;
  let fixture: ComponentFixture<CreateRelationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRelationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRelationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
