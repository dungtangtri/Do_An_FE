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
    USERNAME: {
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
      VALIDATORS: [Validators.required],
    },
    RESERVATION_DESCRIPTION: {
      NAME: 'reservationDescription',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
    ROOM_ID: {
      NAME: 'roomId',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
    SHIFT_OPTION: {
      NAME: 'shiftOption',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
    ROOM_CAPACITY: {
      NAME: 'roomCapacity',
      VALUE: '',
      VALIDATORS: '',
      disabled: true
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
      VALIDATORS: [Validators.required, Validators.minLength(5), Validators.maxLength(40)],
    },
  };
  static readonly CLASSROOM_FORM_CONTROL_NAME = {
    CLASS_LOCATION: {
      NAME: 'classLocation',
      VALUE: '',
      VALIDATORS: [],
    },
    HAS_POWER_OUTLET: {
      NAME: 'powerOutlet',
      VALUE: '',
      VALIDATORS: [],
    }
  }
  static readonly ADD_NEW_CLASSROOM_FORM_CONTROL_NAME = {
    CLASS_LOCATION: {
      NAME: 'classLocation',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
    HAS_POWER_OUTLET: {
      NAME: 'powerOutlet',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
    CLASS_CAPACITY: {
      NAME: 'classCapacity',
      VALUE: '',
      VALIDATORS: [Validators.required],
    }
  }
  static readonly SUGGESTION_FORM_CONTROL_NAME = {
    CAN_ACCEPT_NO_POWER_OUTLET: {
      NAME: 'canAcceptNoPowerOutlet',
      VALUE: false,
      VALIDATORS: [],
    },
    HAS_POWER_OUTLET: {
      NAME: 'powerOutlet',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
    CLASS_CAPACITY: {
      NAME: 'classCapacity',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
    SHIFT_OPTION: {
      NAME: 'shiftOption',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
    DAY: {
      NAME: 'day',
      VALUE: '',
      VALIDATORS: [Validators.required],
    },
  }
}
