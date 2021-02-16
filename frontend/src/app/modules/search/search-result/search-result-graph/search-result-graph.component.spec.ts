import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultGraphComponent } from './search-result-graph.component';

describe('SearchResultGraphComponent', () => {
  let component: SearchResultGraphComponent;
  let fixture: ComponentFixture<SearchResultGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
