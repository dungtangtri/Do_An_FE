import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {FilterMatchMode, SelectItem} from "primeng/api";
import {GetMyReservationsDto} from "./models/get-my-reservations-dto";
import {FormGroup} from "@angular/forms";
import {CONSTANTS} from "./utils/CONSTANTS";
import {Util} from "../util/util.class";
import {BaseSearchForm} from "../shared/BaseSearchForm";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  content: GetMyReservationsDto[] = [];
  cols: any[] = [];
  formSearch: FormGroup;
  matchModeOptions: SelectItem[] = [];

  constructor(private userService: UserService) {
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
      {field: 'stt', header: 'STT'},
      {field: 'reservation_id', header: 'Reservation ID'},
      {field: 'create_time', header: 'Create Time'},
      {field: 'reservation_description', header: 'Reservation Description'},
      {field: 'reservation_start_time', header: 'Reservation Start Time'},
      {field: 'reservation_end_time', header: 'Reservation Start Time'},
      {field: 'room_id', header: 'Room ID'},
      {field: 'status', header: 'Status'},
    ];
  }
  getData(){
    const searchForm : BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    this.userService.getMyReservation(searchForm).subscribe({
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
