import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '@core/services/auth/auth.service';
import { ErrorsService } from '@core/services/errors.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderService } from '@modules/header/header.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';
import SpyObj = jasmine.SpyObj;

describe('AuthComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let authSpy: SpyObj<Pick<AuthService, 'signup'>>;
  let errorsHandlerSpy: SpyObj<Pick<ErrorsService, 'handle'>>;
  let headerSpy: SpyObj<Pick<HeaderService, 'setTitle'>>;
  let snackbarSpy: SpyObj<Pick<MatSnackBar, 'open'>>;
  let routerSpy: SpyObj<Pick<Router, 'navigate'>>;
  let firstNameInput: HTMLInputElement;
  let lastNameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  const userDtoStub: Readonly<IUserDto> = {
    avatarSrc: '',
    id: '',
    createdAt: 0,
    email: '',
    firstName: '',
    lastName: null,
    phone: null,
    about: null,
    workSchedule: null,
    workType: null,
    experience: null,
    english: null,
    keywords: [''],
    hourlyRate: null,
  };

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['signup']);
    errorsHandlerSpy = jasmine.createSpyObj('ErrorsService', ['handle']);
    headerSpy = jasmine.createSpyObj('HeaderService', ['setTitle']);
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: ErrorsService, useValue: errorsHandlerSpy },
        { provide: HeaderService, useValue: headerSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: null }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    firstNameInput = fixture.nativeElement.querySelector('[data-qa="first-name-input"]');
    lastNameInput = fixture.nativeElement.querySelector('[data-qa="last-name-input"]');
    emailInput = fixture.nativeElement.querySelector('[data-qa="email-input"]');
    passwordInput = fixture.nativeElement.querySelector('[data-qa="password-input"]');
    submitButton = fixture.nativeElement.querySelector('[data-qa="submit-button"]');
  });

  it('should set sign up <title>', () => {
    expect(headerSpy.setTitle).toHaveBeenCalledWith('Sign up');
  });

  const fillFormAndSubmit = () => {
    const formValue = {
      firstName: 'Antay',
      lastName: 'Juskovets',
      email: 'vandervise465@gmail.com',
      password: 'qwerty'
    };

    firstNameInput.value = formValue.firstName;
    firstNameInput.dispatchEvent(new Event('input'));

    lastNameInput.value = formValue.lastName;
    lastNameInput.dispatchEvent(new Event('input'));

    emailInput.value = formValue.email;
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = formValue.password;
    passwordInput.dispatchEvent(new Event('input'));

    submitButton.click();
    fixture.detectChanges();

    return formValue;
  };

  it('should call signup, show snackbar and navigate to signin on valid form values', () => {
    authSpy.signup.and.returnValue(of(userDtoStub));
    const formValue = fillFormAndSubmit();
    expect(authSpy.signup).toHaveBeenCalledWith(formValue);
    expect(snackbarSpy.open).toHaveBeenCalledWith(
      `Check your ${formValue.email} for Verification Link`,
      'Yeah!',
      { duration: undefined }
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['../signin'], { relativeTo: null });
  });

  it('shouldn\'t call signup on invalid form values', () => {
    emailInput.value = 'vandervise465il.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'qwerty';
    passwordInput.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges();

    expect(authSpy.signup).not.toHaveBeenCalled();
  });

  it('should call ErrorsService#handle in case of error', () => {
    const error = new HttpErrorResponse({ error: { message: 'Something went wrong' } });
    authSpy.signup.and.returnValue(new Observable(subscriber => subscriber.error(error)));

    fillFormAndSubmit();

    expect(errorsHandlerSpy.handle).toHaveBeenCalledWith(error);
  });
});
