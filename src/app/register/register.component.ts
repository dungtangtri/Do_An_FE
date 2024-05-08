import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private messageService : MessageService) { }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.messageService.add({ severity: 'success', summary: 'Successfully Signing Up', detail: 'Successfully signed up. Redirecting to login page in 3 seconds. ' });
        window.setTimeout(function () {
          window.location.replace('/login')
        }, 3000)
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.messageService.add({ severity: 'error', summary: 'Unsuccessfully Signing Up', detail: this.errorMessage });
      }
    });
  }
}
