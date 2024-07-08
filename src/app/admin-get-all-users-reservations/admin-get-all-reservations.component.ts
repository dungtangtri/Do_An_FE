import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from './service/admin.service';
import {GetAllUserWithReservationDto} from './models/get-all-user-with-reservation-dto';
import {ConfirmationService, MessageService,} from 'primeng/api';
import {Util} from '../util/util.class';
import {CONSTANTS} from '../board-user/utils/CONSTANTS';
import {FormGroup} from '@angular/forms';
import {UpdateReservationDetailForm} from "./models/update-reservation-detail-form";
import {CalendarEvent, CalendarView} from "angular-calendar";
import {isSameDay, isSameMonth,} from 'date-fns';
import {GetAllReservationSearchForm} from "./models/get-all-reservation-search-form";
import {UserService} from "../auth-service/user.service";

@Component({
  selector: 'app-admin-get-all-users-reservations',
  templateUrl: './admin-get-all-reservations.html',
  styleUrls: ['./admin-get-all-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class AdminGetAllReservationsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  content: GetAllUserWithReservationDto[] = [];
  cols: any[] = [];
  reservation_id: any;
  startTime: any;
  endTime: any;
  roomLocation: any;
  userRole: any[] = [{id:'ROLE_ADMIN', name:'ROLE_ADMIN'},{id:'ROLE_STUDENT', name:'ROLE_STUDENT'},{id:'ROLE_TEACHER',name:'ROLE_TEACHER'}];
  status: any[] = [{id: '1', name: 'ACCEPTED'}, {id: '2', name: 'REJECTED'}, {id: '0', name: 'PROCESSING'}];
  description: any;
  currentStatus: any;
  formSearch: FormGroup;
  today: Date;
  maxDate: Date;
  minDate: Date;
  isVisibleImportExcel = false;
  isVisibleCalendar = false;
  isVisibleEdit = false;
  isValid = true;
  isValidDateEdit = true;
  selectedIds: number[] = [];
  selectedFile: any;
  validFile = false;
  resultImport: any;
  isSubmitFile = false;
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
    private userService: UserService
  ) {
    this.formSearch = Util.createFormGroup(CONSTANTS.SEARCH_FORM_CONTROL_NAME);
    this.today = new Date();
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+7);
    this.minDate = this.today;
  }

  ngOnInit(): void {
    this.getData();
    this.getClassroomList();
    this.cols = [
      { field: 'select', header: 'Select'},
      { field: 'no', header: 'No' },
      { field: 'reservation_id', header: 'Reservation ID' },
      { field: 'username', header: 'Username' },
      { field: 'userRole', header: 'User Role'},
      { field: 'email', header: 'Email' },
      { field: 'create_time', header: 'Create Time' },
      { field: 'reservation_description', header: 'Reservation Description' },
      { field: 'reservation_start_time', header: 'Reservation Start Time' },
      { field: 'reservation_end_time', header: 'Reservation End Time' },
      { field: 'classLocation', header: 'Room Location'},
      { field: 'status', header: 'Status' },
      { field: 'action', header: 'Action' },
    ];
  }

  classroomList: any;
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
          title: 'Room : ' + reservation.class_location + " is reserved from: " + new Date(reservation.reservation_start_time) + " to " + new Date(reservation.reservation_end_time) + " by username: " + reservation.username,
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
    this.roomLocation = data.class_location;
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

  validateTimeEditForm() {
    if (this.startTime < this.endTime) {
      this.isValidDateEdit = true;
    } else if ((this.startTime > this.endTime && this.endTime != '')) {
      this.isValidDateEdit = false;
    }
  }
  acceptUpdateReservation(){
    let updateForm: UpdateReservationDetailForm = {
      roomId: this.roomLocation,
      status: this.currentStatus,
      endTime: Util.convertDateToTimeStamp(this.endTime),
      startTime: Util.convertDateToTimeStamp(this.startTime),
      reservationId: this.reservation_id
    };
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
          detail:err.error
            ,
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
  checked(event: any, data: GetAllUserWithReservationDto ): void {
    if (event.checked) {
      // Add reservation_id to the selectedIds array if checked
      if (!this.selectedIds.includes(data.reservation_id)) {
        this.selectedIds.push(data.reservation_id);
      }
    } else {
      // Remove reservation_id from the selectedIds array if unchecked
      const index = this.selectedIds.indexOf(data.reservation_id);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      }
    }
  }
  approveMultipleReservation(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approve multiple reservations?',
      header: 'Approve Multiple Reservations',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptApproveMultipleReservation();
      },
    });
  }
  acceptApproveMultipleReservation(){
    this.adminService.approveMultipleReservation(this.selectedIds).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully approve reservations.',
        });
        this.getData();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error approving reservations',
          detail:
            'Error approving reservations, please try again later.',
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
          name: classroom.classLocation
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

  downloadExcelTemplate() {
    this.adminService.downloadExcelTemplate().subscribe({
      next: (res) => {
        Util.checkExportFile(res, 'Import_Reservations_Template');
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully download Excel Template',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error when Downloading Excel Template',
        });
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType === 'xls' || fileType === 'xlsx') {
        this.selectedFile = file;
        this.validFile = true;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please upload a valid Excel file (.xls or .xlsx).',
        });
        this.selectedFile = null;
        this.validFile = false;
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  onSubmitFile() {
    this.adminService.importExcel(this.selectedFile).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully import Excel file',
        });
        this.resultImport = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error processing Excel File',
        });
      },
    });
  }
}
