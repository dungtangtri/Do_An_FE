import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-service/auth.service';
import {StorageService} from '../auth-service/storage.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ResendVerificationLinkRequest} from "./models/resend-verification-link-request";

const USER_KEY = 'auth-user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isUserActivated: boolean = true;
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    this.isUserActivated = true;
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully Signed In',
          detail:
            'Successfully signed in. Redirecting to home page in 3 seconds. ',
        });
        window.setTimeout(function () {
          window.location.replace('/home');
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        if (this.errorMessage.includes("User is disabled")) {
          this.isLoginFailed = true;
          this.isUserActivated = false;
          this.errorMessage = "The user is not activated."
          this.messageService.add({
            severity: 'error',
            summary: 'Unsuccessfully Signed In',
            detail: this.errorMessage,
          });
        } else {
          this.isLoginFailed = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Unsuccessfully Signed In',
            detail: this.errorMessage,
          });
        }
      },
    });
  }

  resendVerificationLink(event: Event) {
    event.preventDefault();
    const {username, password} = this.form;
    const request: ResendVerificationLinkRequest = {username: username};
    this.authService.resendVerificationLink(request).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully resend the verification email',
          detail:
            'Successfully resend the verification email. Please check your email to activate your account',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Unsuccessfully resend the verification email',
          detail: err.error,
        });
      }
    })
  }
}
