import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsListDialogComponent } from './relations-list-dialog.component';

describe('RelationsListDialogComponent', () => {
  let component: RelationsListDialogComponent;
  let fixture: ComponentFixture<RelationsListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationsListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
