import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {UserResetPasswordRequest} from "../user-reset-password/models/user-reset-password-request";
import {UserService} from "../_services/user.service";
import {ForgotPasswordRequest} from "./models/forgot-password-request";

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ForgotPasswordComponent implements OnInit {
  blockSpace: RegExp = /[^\s]/;
  form: any = {
    email: null
  };

  ngOnInit() {
    if (this.isLoggedIn()) {
      window.location.replace('/home');
    }
  }

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  onSubmit() {
    const request: ForgotPasswordRequest = this.form;
    this.userService.userForgotPassword(request).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully sent an email to your email address',
          detail:
            'Successfully sent an email to your email address. Please check your email for instructions to reset your password.',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err.error,
        });
      },
    });
  }
}
