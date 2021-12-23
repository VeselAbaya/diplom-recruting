import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNodeComponent } from './user-node.component';

describe('UserNodeComponent', () => {
  let component: UserNodeComponent;
  let fixture: ComponentFixture<UserNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
