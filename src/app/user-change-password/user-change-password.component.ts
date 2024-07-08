import {Component, OnInit} from '@angular/core';
import {UserService} from "../auth-service/user.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserChangePasswordRequest} from "./models/user-change-password-request";
import {AuthService} from "../auth-service/auth.service";

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class UserChangePasswordComponent implements OnInit {
  blockSpace: RegExp = /[^\s]/;
  isSamePassword = false
  form: any = {
    oldPassword: null,
    newPassword: null,
    confirmPassword: null
  };

  ngOnInit() {
    if (!this.isLoggedIn()) {
      window.location.replace('/home');
    }
  }
  constructor( private userService: UserService,
               private messageService: MessageService,
               private authService: AuthService) {
  }

  validatePassword() {
    this.isSamePassword = this.form.newPassword !== this.form.confirmPassword;
  }
  onSubmit(){
    const request: UserChangePasswordRequest = this.form;
    this.userService.userChangePassword(request).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully changed your password',
          detail:
            'Successfully changed your password. Please re-login to your account using your new password. Signing out in 2 seconds.',
        });
        window.localStorage.clear();
        this.authService.logout().subscribe();
        window.setTimeout(function () {
          window.location.replace('/home');
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error when changing your password. Your password was not changed.',
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
