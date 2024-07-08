import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {UserService} from "../auth-service/user.service";
import {AuthService} from "../auth-service/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UserResetPasswordRequest} from "./models/user-reset-password-request";

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class UserResetPasswordComponent implements OnInit {
  blockSpace: RegExp = /[^\s]/;
  isSamePassword = false
  form: any = {
    token: null,
    newPassword: null,
    confirmPassword: null
  };
  token: any;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      window.location.replace('/home');
    }
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  validatePassword() {
    this.isSamePassword = this.form.newPassword !== this.form.confirmPassword;
  }

  onSubmit() {
    this.form.token = this.token
    const request: UserResetPasswordRequest = this.form;
    this.userService.userResetPassword(request).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully reset your password',
          detail:
            'Successfully reset your password. Please re-login to your account using your new password.',
        });
        window.localStorage.clear();
        this.authService.logout().subscribe();
        window.setTimeout(function () {
          window.location.replace('/home');
        }, 4000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error when resetting your password. Your password was not changed.',
          detail: err.error,
        });
      },
    });
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
