import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  placeReservation() {
    if (!this.isLoggedIn()) {
      window.location.replace('/login');
    } else {
      window.location.replace('/place-reservation');
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
