import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThinInputFieldComponent } from '@shared/components/thin-input-field/thin-input-field.component';

describe('ThinInputFieldComponent', () => {
  let component: ThinInputFieldComponent;
  let fixture: ComponentFixture<ThinInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThinInputFieldComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
