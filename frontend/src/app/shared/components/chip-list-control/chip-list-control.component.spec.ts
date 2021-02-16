import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListControlComponent } from './chip-list-control.component';

describe('ChipListControlComponent', () => {
  let component: ChipListControlComponent;
  let fixture: ComponentFixture<ChipListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipListControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
