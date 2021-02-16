import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenScrollWrapperComponent } from './hidden-scroll-wrapper.component';

describe('HiddenScrollWrapperComponent', () => {
  let component: HiddenScrollWrapperComponent;
  let fixture: ComponentFixture<HiddenScrollWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiddenScrollWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenScrollWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
