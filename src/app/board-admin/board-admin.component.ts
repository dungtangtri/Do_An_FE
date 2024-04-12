import { Component, OnInit } from '@angular/core';
import {AdminService} from "./service/admin.service";
import {GetAllUserWithReservationDto} from "./models/get-all-user-with-reservation-dto";
import {FilterMatchMode, FilterService, SelectItem} from "primeng/api";
import {BaseSearchForm} from "../shared/BaseSearchForm";
import {Util} from "../util/util.class";
import {CONSTANTS} from "../board-user/utils/CONSTANTS";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  content : GetAllUserWithReservationDto[] = [];
  cols : any[] = [];
  formSearch: FormGroup;
  matchModeOptions: SelectItem[] = [];
  constructor(private adminService: AdminService) {
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
      { field: 'stt', header: 'STT' },
      { field: 'reservation_id', header: 'Reservation ID' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'create_time', header: 'Create Time' },
      { field: 'reservation_description', header: 'Reservation Description' },
      { field: 'reservation_start_time', header: 'Reservation Start Time' },
      { field: 'reservation_end_time', header: 'Reservation Start Time' },
      { field: 'room_id', header: 'Room ID' },
      { field: 'status', header: 'Status' },
    ];
  }
  getData(){
    const searchForm : BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    this.adminService.getAllUser(searchForm).subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
  onSearch() {
    this.getData();
  }
}
