import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {ConfirmationService, FilterMatchMode, MessageService, SelectItem} from "primeng/api";
import {GetMyReservationsDto} from "./models/get-my-reservations-dto";
import {FormGroup} from "@angular/forms";
import {CONSTANTS} from "./utils/CONSTANTS";
import {Util} from "../util/util.class";
import {BaseSearchForm} from "../shared/BaseSearchForm";
import {ChangeStatusForm} from "../shared/ChangeStatusForm";

@Component({
  selector: 'app-board-user',
  templateUrl: './user-get-my-reservations.component.html',
  styleUrls: ['./user-get-my-reservations.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserGetMyReservationsComponent implements OnInit {
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  content: GetMyReservationsDto[] = [];
  cols: any[] = [];
  formSearch: FormGroup;
  matchModeOptions: SelectItem[] = [];
  options = ['PROCESSING','ACCEPTED', 'REJECTED'];

  constructor(private userService: UserService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.formSearch = Util.createFormGroup(CONSTANTS.SEARCH_FORM_CONTROL_NAME)
  }

  ngOnInit(): void {
    this.getData();
    this.matchModeOptions = [
      {
        label: 'Starts With',
        value: FilterMatchMode.STARTS_WITH
      },
      {
        label: 'Contains',
        value: FilterMatchMode.CONTAINS
      },
      {
        label: 'Ends With',
        value: FilterMatchMode.ENDS_WITH
      },
      {
        label: 'Equals',
        value: FilterMatchMode.EQUALS
      },
    ];
    this.cols = [
      {field: 'no', header: 'No.'},
      {field: 'reservation_id', header: 'Reservation ID'},
      {field: 'create_time', header: 'Create Time'},
      {field: 'reservation_description', header: 'Reservation Description'},
      {field: 'reservation_start_time', header: 'Reservation Start Time'},
      {field: 'reservation_end_time', header: 'Reservation End Time'},
      {field: 'room_id', header: 'Room ID'},
      {field: 'status', header: 'Status'},
      {field: 'action' , header: 'Action'}
    ];
  }
  getData(){
    const searchForm : BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    this.userService.getMyReservation(searchForm).subscribe({
      next: data => {
        this.content = data;
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully retrieving data',
          detail: 'Successfully retrieving data from the server.'
        });

      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error retrieving data',
          detail: 'Error retrieving data from the server, please try again later.'
        });
      }
    });
  }
  onSearch() {
    this.getData();
  }

  changeStatusReservation(data: GetMyReservationsDto) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to cancel this reservation? This can not be undone.',
      header: 'Cancel Reservation',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptChangeStatusReservation(data);
      }
    });
  }
// TODO: Thay icon xóa thành đổi trạng thái cho người dùng
  acceptChangeStatusReservation(data: GetMyReservationsDto) {
    const id = data.reservation_id;
    const changeStatusForm: ChangeStatusForm = {
      id: id,
      status: '2'
    }
    this.userService.changeStatusReservation(changeStatusForm).subscribe({
      next: res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Change Status Successfully',
          detail: 'You have change the reservation status successfully'
        });
        this.getData();
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Change Status Unsuccessfully',
          detail: 'Change reservation status unsuccessfully'
        });
      }
    })
  }
  exportExcel(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to export the data?',
      header:'Export Excel',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptExport();
      }
    });
  }
  acceptExport(){
    const searchForm : BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    this.userService.exportGetCurrentUserReservations(searchForm).subscribe({
      next: res => {
        if(res){
          Util.checkExportFile(res, "Current_User_Reservations");
          this.messageService.add({ severity: 'success', summary: 'Successfully export data', detail: 'Successfully export data from the server.'});
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error export data', detail: 'Error exporting data from the server, please try again later.' });
        }
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error export data', detail: 'Error exporting data from the server, please try again later.' });
      }
    });
  }
  resetForm(){
    this.formSearch.reset();
    this.getData();
  }
}
