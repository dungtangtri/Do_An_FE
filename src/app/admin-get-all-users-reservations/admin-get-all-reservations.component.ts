import {Component, OnInit} from '@angular/core';
import {AdminService} from "./service/admin.service";
import {GetAllUserWithReservationDto} from "./models/get-all-user-with-reservation-dto";
import {ConfirmationService, FilterMatchMode, MessageService, SelectItem} from "primeng/api";
import {BaseSearchForm} from "../shared/BaseSearchForm";
import {Util} from "../util/util.class";
import {CONSTANTS} from "../board-user/utils/CONSTANTS";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-get-all-users-reservations',
  templateUrl: './admin-get-all-reservations.html',
  styleUrls: ['./admin-get-all-reservations.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AdminGetAllReservationsComponent implements OnInit {
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  content : GetAllUserWithReservationDto[] = [];
  cols : any[] = [];
  formSearch: FormGroup;
  matchModeOptions: SelectItem[] = [];
  constructor(private adminService: AdminService,
              private confirmationService: ConfirmationService,
              private messageService : MessageService) {
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
      { field: 'action', header: 'Action'}
    ];
  }
  getData(){
    const searchForm : BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    this.adminService.getAllReservations(searchForm).subscribe({
      next: data => {
        this.content = data;
        this.messageService.add({ severity: 'success', summary: 'Successfully retrieving data', detail: 'Successfully retrieving data from the server.'});
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error retrieving data', detail: 'Error retrieving data from the server, please try again later.' });

      }
    });
  }
  onSearch() {
    this.getData();
  }
  deleteReservation(data : GetAllUserWithReservationDto){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this reservation? This can not be undone.',
        header:'Delete Reservation',
        icon: 'pi pi-exclamation-circle color-red',
        accept: () => {
         this.acceptDelete(data);
        }
      });
  }
  acceptDelete(data : GetAllUserWithReservationDto){
    const id = data.reservation_id;
      this.adminService.deleteReservation(id).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Delete Successfully', detail: 'You have deleted successfully' });
          this.getData();
        },
        error: err => {
            this.messageService.add({ severity: 'error', summary: 'Delete Unsuccessfully', detail: 'You have deleted unsuccessfully' });
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
    this.adminService.exportGetAllReservations(searchForm).subscribe({
      next: res => {
        if(res){
          Util.checkExportFile(res, "All_User_Reservations");
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
