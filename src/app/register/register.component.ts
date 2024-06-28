import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {ConfirmationService, MessageService} from 'primeng/api';

const USER_KEY = 'auth-user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class RegisterComponent implements OnInit{
  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isSamePassword = false
  blockSpace: RegExp = /[^\s]/;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) {}
  // redirect user to home page if the user is logged in
  ngOnInit() {
    if(this.isLoggedIn()){
      window.location.replace('/home');
    }
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully Signing Up',
          detail:
            'Successfully signed up. Please check your email to activate your account. Redirecting to login page in 3 seconds. ',
        });
        window.setTimeout(function () {
          window.location.replace('/login');
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Unsuccessfully Signing Up',
          detail: this.errorMessage,
        });
      },
    });
  }

  validatePassword() {
    this.isSamePassword = this.form.password !== this.form.confirmPassword;
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
