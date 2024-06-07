import {Validators} from "@angular/forms";

export class CONSTANTS {
  static readonly SEARCH_FORM_CONTROL_NAME = {
    START_DATE: {
      NAME: 'startDate',
      VALUE: '',
      VALIDATORS: [],
    },
    END_DATE: {
      NAME: 'endDate',
      VALUE: '',
      VALIDATORS: [],
    },
    STATUS: {
      NAME: 'status',
      VALUE: '',
      VALIDATORS: [],
    },
    USER_ROLE: {
      NAME: 'userRole',
      VALUE: '',
      VALIDATORS: [],
    },
    USERNAME:{
      NAME: 'username',
      VALUE: '',
      VALIDATORS: [],
    },
    ROOM_ID: {
      NAME: 'roomId',
      VALUE: '',
      VALIDATORS: [],
    },
    RESERVATION_DATE: {
      NAME: 'reservationDate',
      VALUE: '',
      VALIDATORS: [],
    },
  };
  static readonly RESERVATION_FORM_CONTROL_NAME = {
    DAY: {
      NAME: 'day',
      VALUE: '',
      VALIDATORS: [],
    },
    RESERVATION_DESCRIPTION: {
      NAME: 'reservationDescription',
      VALUE: '',
      VALIDATORS: [],
    },
    ROOM_ID: {
      NAME: 'roomId',
      VALUE: '',
      VALIDATORS: [],
    },
    SHIFT_OPTION: {
      NAME: 'shiftOption',
      VALUE: '',
      VALIDATORS: [],
    },
  };
  static readonly REGISTRATION_FORM_CONTROL_NAME = {
    USERNAME: {
      NAME: 'username',
      VALUE: '',
      VALIDATORS: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    },
    EMAIL: {
      NAME: 'email',
      VALUE: '',
      VALIDATORS: [Validators.required, Validators.email, Validators.maxLength(50)],
    },
    ROLE: {
      NAME: 'role',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
    PASSWORD: {
      NAME: 'password',
      VALUE: '',
      VALIDATORS: [Validators.required, Validators.minLength(5), Validators.maxLength(40)],
    },
    CONFIRM_PASSWORD: {
      NAME: 'confirmPassword',
      VALUE: '',
      VALIDATORS:  [Validators.required, Validators.minLength(5), Validators.maxLength(40)],
    },
  };
}
