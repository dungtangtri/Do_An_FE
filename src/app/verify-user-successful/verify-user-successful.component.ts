import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../auth-service/user.service";
import {ConfirmationService, MessageService} from "primeng/api";

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-verify-user-successful',
  templateUrl: './verify-user-successful.component.html',
  styleUrls: ['./verify-user-successful.component.css'],
  providers: [ConfirmationService, MessageService],
})

export class VerifyUserSuccessfulComponent implements OnInit {
  token: any;
  isSuccessful = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      window.location.replace('/home');
    }else{
      this.route.queryParamMap.subscribe(params => {
        this.token = params.get('token');
        this.userService.verifyUserRegistration(this.token).subscribe({
          next: (data) => {
            this.isSuccessful = true;
            window.setTimeout(function () {
              window.location.replace('/login');
            }, 4000);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: err.error,
            });
            window.setTimeout(function () {
              window.location.replace('/home');
            }, 2000);
          },
        });
      });
    }
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
