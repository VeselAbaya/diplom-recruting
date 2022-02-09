import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoComponent } from '../profile-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileInfoSpecHostComponent } from '@shared/components/profile-info/spec/profile-info-spec-host.component';
import SpyObj = jasmine.SpyObj;
import any = jasmine.any;

describe('ProfileInfoComponent', () => {
  let fixture: ComponentFixture<ProfileInfoSpecHostComponent>;
  let snackbarSpy: SpyObj<Pick<MatSnackBar, 'open'>>;

  beforeEach(async () => {
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ProfileInfoComponent, ProfileInfoSpecHostComponent],
      imports: [MatDialogModule],
      providers: [{ provide: MatSnackBar, useValue: snackbarSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInfoSpecHostComponent);
    fixture.detectChanges();
  });

  it('should show snackbar on empty name saving', () => {
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('.user-info__name input');

    nameInput.value = '';
    nameInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(snackbarSpy.open).toHaveBeenCalledWith('You should write first name at least', any(String), any(Object));
  });

  it('should show snackbar on empty email saving', () => {
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('.user-info__email input');

    emailInput.value = '';
    emailInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(snackbarSpy.open).toHaveBeenCalledWith('Email is required', any(String), any(Object));
  });

  it('should show snackbar on invalid email saving', () => {
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('.user-info__email input');

    emailInput.value = 'qwerty';
    emailInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(snackbarSpy.open).toHaveBeenCalledWith('Invalid email', any(String), any(Object));
  });
});
