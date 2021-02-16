import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWithSearchComponent } from './page-with-search.component';

describe('PageWithSearchComponent', () => {
  let component: PageWithSearchComponent;
  let fixture: ComponentFixture<PageWithSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWithSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWithSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
