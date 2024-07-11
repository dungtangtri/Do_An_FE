import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CONSTANTS} from '../board-user/utils/CONSTANTS';
import {FormGroup} from "@angular/forms";
import {Util} from "../util/util.class";
import {PlaceReservationForm} from "./models/place-reservation-form";
import {UserService} from "../auth-service/user.service";
import {GetRoomSuggestionForm} from "./models/get-room-suggestion-form";
import {GetRoomSuggestionsDto} from "./models/get-room-suggestions-dto";
import {StorageService} from "../auth-service/storage.service";

const USER_KEY = 'auth-user';
@Component({
  selector: 'app-place-reservation',
  templateUrl: './place-reservation.component.html',
  styleUrls: ['./place-reservation.component.css'],
  providers: [ConfirmationService, MessageService],
})

export class PlaceReservationComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storageService: StorageService
  ) {
    this.today = new Date();
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7);
    this.minDate = this.today;
    this.formReservation = Util.createFormGroup(CONSTANTS.RESERVATION_FORM_CONTROL_NAME);
    this.formRoomSuggestion = Util.createFormGroup(CONSTANTS.SUGGESTION_FORM_CONTROL_NAME);
  }

  @ViewChild('focus') noteInput: ElementRef | undefined;

  ngAfterViewInit() {
    console.log(this.noteInput);
  }
  isSubmitFormSuggestion = false;
  havePowerOutlet = [{id: 0, name: 'No'}, {id: 1, name: 'Yes'}];
  classroomList: any;
  formReservation: FormGroup;
  formRoomSuggestion: FormGroup;
  cols: any[] = [{field: 'no', header: 'No'},
    {field: 'classLocation', header: 'Class Location'},
    {field: 'classCapacity', header: 'Class Capacity'},
    {field: 'powerOutlet', header: 'Has Power Outlet?'},
    {field: 'action', header: 'Action'}];
  today: any;
  maxDate: any;
  minDate: any;
  readonly SEARCH_FORM_CONTROL = CONSTANTS.RESERVATION_FORM_CONTROL_NAME;
  readonly SUGGESTION_FORM_CONTROL = CONSTANTS.SUGGESTION_FORM_CONTROL_NAME;
  time: any = [
    { id: 1, name: 'Shift 1: 6h45 - 8h15' },
    { id: 2, name: 'Shift 2: 8h25 - 10h05' },
    { id: 3, name: 'Shift 3: 10h15 - 11h45' },
    { id: 4, name: 'Shift 4: 12h30 - 14h00' },
    { id: 5, name: 'Shift 6: 14h10 - 15h50' },
    { id: 6, name: 'Shift 7: 16h00 - 17h30' },
    { id: 7, name: 'Shift 8: 17h45 - 19h15' },
  ];

  reason: any = [
    {id: 'For Self/Group Study Sessions', name: 'For Self/Group Study Sessions'},
    {id: 'For Club or Organization Meetings', name: 'For Club or Organization Meetings'},
    {id: 'For Project Work', name: 'For Project Work'},
    {id: 'For Online Classes or Meetings', name: 'For Online Classes or Meetings'},
    {id: 'For Personal Use', name: 'For Personal Use'}
  ]
  dataRoomSuggestion: any;

  ngOnInit() {
    this.formRoomSuggestion.get(this.SUGGESTION_FORM_CONTROL.HAS_POWER_OUTLET.NAME)?.valueChanges.subscribe(value => {
      if (value === 1) {
        this.formRoomSuggestion.get(this.SUGGESTION_FORM_CONTROL.CAN_ACCEPT_NO_POWER_OUTLET.NAME)?.enable();
      } else {
        this.formRoomSuggestion.get(this.SUGGESTION_FORM_CONTROL.CAN_ACCEPT_NO_POWER_OUTLET.NAME)?.disable();
        this.formRoomSuggestion.get(this.SUGGESTION_FORM_CONTROL.CAN_ACCEPT_NO_POWER_OUTLET.NAME)?.reset();
      }
    });
    this.getClassroomList();
    this.changeClassroomCapacity();
    if(this.isTeacher()){
      this.reason = [
        {id: 'Scheduled Classes', name: 'Scheduled Classes'},
        {id: 'Exams and Assessments', name: 'Exams and Assessments'},
        {id: 'Meetings and Consultations', name: 'Meetings and Consultations'},
        {id: 'Special Events', name: 'Special Events'},
        {id: 'Group Activities', name: 'Group Activities'},
      ];
    }
  }

  placeReservation() {
    const searchForm: PlaceReservationForm = Util.getDataFormSearch(this.formReservation)
    this.userService.placeReservation(searchForm).subscribe({
      next: (data) => {
        this.formRoomSuggestion.reset();
        this.formReservation.reset();
        this.isSubmitFormSuggestion = false;
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

  // Lấy list phòng học
  getClassroomList() {
    this.userService.getClassroomList().subscribe({
      next: (res) => {
        this.classroomList = res.map(classroom => ({
          id: classroom.id,
          name: classroom.classLocation,
          capacity: classroom.classCapacity
        }));
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'An error happened when retrieving classroom list. Please try again later',
        });
      },
    });
  }

  //change classroom capacity base on room id
  changeClassroomCapacity() {
    this.formReservation.get('roomId')?.valueChanges.subscribe(selectedId => {
      const selectedClassroom = this.classroomList.find((classroom: { id: any; }) => classroom.id === selectedId);
      if (selectedClassroom) {
        this.formReservation.get('roomCapacity')?.setValue(selectedClassroom.capacity);
      } else {
        this.formReservation.get('roomCapacity')?.setValue('');
      }
    });
  }

  getRoomSuggestion() {
    if (this.isLoggedIn()) {
      const searchForm: GetRoomSuggestionForm = Util.getDataFormSearch(this.formRoomSuggestion)
      this.userService.getRoomSuggestion(searchForm).subscribe({
        next: (data) => {
          this.dataRoomSuggestion = data;
          this.isSubmitFormSuggestion = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully get room suggestions base on your requirements',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: err.error,
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'You must log in to use this feature!',
        detail: 'Redirecting to login page in 3 seconds.'
      });
      window.setTimeout(function () {
        window.location.replace('/login');
      },3000)
    }
  }

  placeReservationRoomSuggestion(data: GetRoomSuggestionsDto) {
    if (this.isLoggedIn()) {
      this.formReservation.get(this.SEARCH_FORM_CONTROL.DAY.NAME)?.setValue(this.formRoomSuggestion.get(this.SUGGESTION_FORM_CONTROL.DAY.NAME)?.value);
      this.formReservation.get(this.SEARCH_FORM_CONTROL.ROOM_ID.NAME)?.setValue(data.id);
      this.formReservation.get(this.SEARCH_FORM_CONTROL.SHIFT_OPTION.NAME)?.setValue(this.formRoomSuggestion.get(this.SUGGESTION_FORM_CONTROL.SHIFT_OPTION.NAME)?.value);
      setTimeout(() => {
        if (this.noteInput) {
          this.noteInput.nativeElement.focus();
        }
      }, 1);
    }

  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
  isTeacher(){
    if (this.storageService.isLoggedIn()) {
      const roles = this.storageService.getUser().roles;
      if(roles.includes('ROLE_TEACHER')){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
}
