import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {AuthService} from "../../../core/services/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {NotificationService} from "../../../core/services/notification.service";

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule,  HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [LoginComponent
      ],
      providers: [LoginComponent, AuthService, NotificationService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  })

  it('should create the login', () => {
    expect(component).toBeTruthy();
  });

  it(`component show email`, () => {
    component.loginForm.value.password = 'Test@gmail.com'
    expect(component.loginForm.value.password).toBe('Test@gmail.com');
  });

  it('should have input element with email', () => {
    const element = fixture.debugElement.nativeElement.querySelector('#email')
    expect(element).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have input element with password',  () => {
    const element = fixture.debugElement.nativeElement.querySelector('#password')
    expect(element).toBeTruthy();
  });

  it('submitting a form emits a user', () => {
    spyOn(component, 'onSubmit');

    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.controls['email'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("123456789");
    // component.loginForm.controls['rememberMe'].setValue(false);

    expect(component.loginForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
