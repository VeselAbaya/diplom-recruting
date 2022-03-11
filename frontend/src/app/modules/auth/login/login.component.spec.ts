import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '@core/services/auth/auth.service';
import { ErrorsService } from '@core/services/errors.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderService } from '@modules/header/header.service';
import SpyObj = jasmine.SpyObj;

describe('AuthComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy: SpyObj<Pick<AuthService, 'signin'>>;
  let errorsHandlerSpy: SpyObj<Pick<ErrorsService, 'handle'>>;
  let headerSpy: SpyObj<Pick<HeaderService, 'setTitle'>>;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['signin']);
    errorsHandlerSpy = jasmine.createSpyObj('ErrorsService', ['handle']);
    headerSpy = jasmine.createSpyObj('HeaderService', ['setTitle']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: ErrorsService, useValue: errorsHandlerSpy },
        { provide: HeaderService, useValue: headerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    emailInput = fixture.nativeElement.querySelector('[data-qa="email-input"]');
    passwordInput = fixture.nativeElement.querySelector('[data-qa="password-input"]');
    submitButton = fixture.nativeElement.querySelector('[data-qa="submit-button"]');
  });

  it('should set login <title>', () => {
    expect(headerSpy.setTitle).toHaveBeenCalledWith('Sign in');
  });

  const fillFormAndSubmit = () => {
    const formValue = {
      email: 'vandervise465@gmail.com',
      password: 'qwerty'
    };

    emailInput.value = formValue.email;
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = formValue.password;
    passwordInput.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges();

    return formValue;
  };

  it('should call signin on valid form values', () => {
    authSpy.signin.and.returnValue(EMPTY);
    const formValue = fillFormAndSubmit();
    expect(authSpy.signin).toHaveBeenCalledWith(formValue);
  });

  it('shouldn\'t call signin on invalid form values', () => {
    emailInput.value = 'vandervise465il.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'qwerty';
    passwordInput.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges();

    expect(authSpy.signin).not.toHaveBeenCalled();
  });

  it('should call ErrorsService#handle in case of error', () => {
    const error = new HttpErrorResponse({ error: { message: 'Something went wrong' } });
    authSpy.signin.and.returnValue(new Observable(subscriber => subscriber.error(error)));

    fillFormAndSubmit();

    expect(errorsHandlerSpy.handle).toHaveBeenCalledWith(error);
  });
});
