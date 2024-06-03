import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AdminService} from './service/admin.service';
import {GetAllUserWithReservationDto} from './models/get-all-user-with-reservation-dto';
import {ConfirmationService, FilterMatchMode, MessageService, SelectItem,} from 'primeng/api';
import {BaseSearchForm} from '../shared/BaseSearchForm';
import {Util} from '../util/util.class';
import {CONSTANTS} from '../board-user/utils/CONSTANTS';
import {FormGroup} from '@angular/forms';
import {UpdateReservationDetailForm} from "./models/update-reservation-detail-form";
import {CalendarEvent, CalendarView} from "angular-calendar";
import {isSameDay, isSameMonth,} from 'date-fns';
import {GetAllReservationSearchForm} from "./models/get-all-reservation-search-form";

@Component({
  selector: 'app-admin-get-all-users-reservations',
  templateUrl: './admin-get-all-reservations.html',
  styleUrls: ['./admin-get-all-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class AdminGetAllReservationsComponent implements OnInit {
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  content: GetAllUserWithReservationDto[] = [];
  cols: any[] = [];
  reservation_id: any;
  startTime: any;
  endTime: any;
  roomId: any;
  status: any[] = [{id: '1', name: 'ACCEPTED'}, {id: '2', name: 'REJECTED'}, {id: '0', name: 'PROCESSING'}];
  description: any;
  currentStatus: any;
  formSearch: FormGroup;
  today: any;
  maxDate: any;
  minDate: any;
  isVisibleCalendar = false;
  isVisibleEdit = false;
  isValid = true;
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen: boolean = true;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.formSearch = Util.createFormGroup(CONSTANTS.SEARCH_FORM_CONTROL_NAME);
    this.today = new Date();
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+7);
    this.minDate = this.today;
  }

  ngOnInit(): void {
    this.getData();
    this.cols = [
      { field: 'no', header: 'No' },
      { field: 'reservation_id', header: 'Reservation ID' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'create_time', header: 'Create Time' },
      { field: 'reservation_description', header: 'Reservation Description' },
      { field: 'reservation_start_time', header: 'Reservation Start Time' },
      { field: 'reservation_end_time', header: 'Reservation End Time' },
      { field: 'room_id', header: 'Room ID' },
      { field: 'status', header: 'Status' },
      { field: 'action', header: 'Action' },
    ];
  }
  // TODO: tạo api lấy danh sách phoòng học
  class: any =
    [
      {id: 101, name: 'D8-101'},
      {id: 102, name: 'D8-102'},
      {id: 103, name: 'D8-103'},
      {id: 104, name: 'D8-104'}
    ]
  getData() {
    const searchForm: GetAllReservationSearchForm = Util.getDataFormSearch(this.formSearch);
    this.adminService.getAllReservations(searchForm).subscribe({
      next: (data) => {
        this.content = data;
        // Filter all accepted reservations
        const filteredReservations = data.filter(reservation => reservation.status === '1');
        this.events = filteredReservations.map(reservation => ({
          start: new Date(reservation.reservation_start_time),
          end: new Date(reservation.reservation_end_time),
          title: 'Room : ' + reservation.room_id.toString() + " is reserved from: " + new Date(reservation.reservation_start_time) + " to " + new Date(reservation.reservation_end_time) + " by username: " + reservation.username,
        }));
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully retrieving data',
          detail: 'Successfully retrieving data from the server.',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error retrieving data',
          detail:
            'Error retrieving data from the server, please try again later.',
        });
      },
    });
  }
  onSearch() {
    this.getData();
  }
  deleteReservation(data: GetAllUserWithReservationDto) {
    this.confirmationService.confirm({
      message:
        'Are you sure that you want to delete this reservation? This can not be undone.',
      header: 'Delete Reservation',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptDelete(data);
      },
    });
  }
  acceptDelete(data: GetAllUserWithReservationDto) {
    const id = data.reservation_id;
    this.adminService.deleteReservation(id).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Delete Successfully',
          detail: 'You have deleted successfully',
        });
        this.getData();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Delete Unsuccessfully',
          detail: 'You have deleted unsuccessfully',
        });
      },
    });
  }
  exportExcel() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to export the data?',
      header: 'Export Excel',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptExport();
      },
    });
  }
  acceptExport() {
    const searchForm: GetAllReservationSearchForm = Util.getDataFormSearch(this.formSearch);
    this.adminService.exportGetAllReservations(searchForm).subscribe({
      next: (res) => {
        if (res) {
          Util.checkExportFile(res, 'All_User_Reservations');
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully export data',
            detail: 'Successfully export data from the server.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error export data',
            detail:
              'Error exporting data from the server, please try again later.',
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error export data',
          detail:
            'Error exporting data from the server, please try again later.',
        });
      },
    });
  }
  resetForm() {
    this.formSearch.reset();
    this.getData();
  }

  editReservation(data: GetAllUserWithReservationDto) {
    this.isVisibleEdit = true;
    this.updateReservation(data)
  }
  updateReservation(data: GetAllUserWithReservationDto) {
    this.reservation_id = data.reservation_id;
    this.startTime = new Date(data.reservation_start_time);
    this.endTime = new Date(data.reservation_end_time)
    this.currentStatus = this.status.find(s => s.id === data.status).id;
    this.description = data.reservation_description;
    this.roomId = data.room_id;
  }
  updateReservationDetail(){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to update this reservation?',
        header: 'Update Reservation',
        icon: 'pi pi-exclamation-circle color-red',
        accept: () => {
          this.acceptUpdateReservation();
        },
      });
  }
  validateTime() {
    if (this.formSearch.get('startDate')?.value < this.formSearch.get('endDate')?.value) {
      this.isValid = true;
    } else if((this.formSearch.get('startDate')?.value > this.formSearch.get('endDate')?.value) && this.formSearch.get('endDate')?.value != '' ) {
      this.isValid = false;
    }
  }
  acceptUpdateReservation(){
    let updateForm: UpdateReservationDetailForm = {roomId: this.roomId, status: this.currentStatus, endTime: Util.convertDateToTimeStamp(this.endTime), startTime:Util.convertDateToTimeStamp(this.startTime), reservationId: this.reservation_id };
    this.adminService.updateReservationDetail(updateForm).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully updating reservation detail',
          detail: 'Successfully updating reservation detail.',
        });
        this.getData();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error updating reservation detail',
          detail:
            'Error updating reservation detail, please try again later.',
        });
      },
    });
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
