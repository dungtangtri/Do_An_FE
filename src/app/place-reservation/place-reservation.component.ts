import {Component} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CONSTANTS} from '../board-user/utils/CONSTANTS';
import {FormGroup} from "@angular/forms";
import {Util} from "../util/util.class";
import {PlaceReservationForm} from "./models/place-reservation-form";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-place-reservation',
  templateUrl: './place-reservation.component.html',
  styleUrls: ['./place-reservation.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class PlaceReservationComponent {
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.today = new Date();
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7);
    this.minDate = this.today;
    this.formReservation = Util.createFormGroup(CONSTANTS.RESERVATION_FORM_CONTROL_NAME);
  }

  formReservation: FormGroup;
  today: any;
  maxDate: any;
  minDate: any;
  readonly SEARCH_FORM_CONTROL = CONSTANTS.RESERVATION_FORM_CONTROL_NAME;
  time: any = [
    { id: 1, name: 'Shift 1: 6h45 - 8h15' },
    { id: 2, name: 'Shift 2: 8h25 - 10h05' },
    { id: 3, name: 'Shift 3: 10h15 - 11h45' },
    { id: 4, name: 'Shift 4: 12h30 - 14h00' },
    { id: 5, name: 'Shift 6: 14h10 - 15h50' },
    { id: 6, name: 'Shift 7: 16h00 - 17h30' },
    { id: 7, name: 'Shift 8: 17h45 - 19h15' },
  ];
  class: any =
    [
      {id: 101, name: 'D8-101'},
      {id: 102, name: 'D8-102'},
      {id: 103, name: 'D8-103'},
      {id: 104, name: 'D8-104'}
    ]

  placeReservation() {
    const searchForm: PlaceReservationForm = Util.getDataFormSearch(this.formReservation)
    this.userService.placeReservation(searchForm).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully place reservation',
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
