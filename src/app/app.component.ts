import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showTeacherBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }
  logout(): void {
    this.storageService.clean();
    this.authService.logout().subscribe({
      next: (res) => {
        if (res.message.includes('Successfully')) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully Signed Out',
          });
        }
      },
      error: (err) => {
        const errorMessage = err.error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Unsuccessfully Sign In',
          detail: errorMessage,
        });
      },
    });
  }
}
