import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CONSTANTS } from '../board-user/utils/CONSTANTS';

@Component({
  selector: 'app-place-reservation',
  templateUrl: './place-reservation.component.html',
  styleUrls: ['./place-reservation.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class PlaceReservationComponent {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  time: any = [
    { id: 1, name: 'Shift 1: 6h45 - 8h15' },
    { id: 2, name: 'Shift 2: 8h25 - 10h05' },
    { id: 3, name: 'Shift 3: 10h15 - 11h45' },
    { id: 4, name: 'Shift 4: 12h30 - 14h00' },
    { id: 5, name: 'Shift 6: 14h10 - 15h50' },
    { id: 6, name: 'Shift 7: 16h00 - 17h30' },
    { id: 7, name: 'Shift 8: 17h45 - 19h15' },
  ];
}
