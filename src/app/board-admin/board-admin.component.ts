import { Component, OnInit } from '@angular/core';
import {AdminService} from "./service/admin.service";
import {GetAllUserDto} from "./models/get-all-user-dto";
import {FilterMatchMode, FilterService, SelectItem} from "primeng/api";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content : GetAllUserDto[] = [];
  cols : any[] = [];
  matchModeOptions: SelectItem[] = [];
  constructor(private adminService: AdminService,
              private filterService: FilterService) { }

  ngOnInit(): void {
    this.adminService.getAllUser().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.log(err);
      }
    });
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
      { field: 'user_id', header: 'User ID' },
      { field: 'email', header: 'Email' },
      { field: 'create_time', header: 'Create Time' },
      { field: 'reservation_description', header: 'Reservation Description' },
      { field: 'reservation_start_time', header: 'Reservation Start Time' },
      { field: 'reservation_end_time', header: 'Reservation Start Time' },
      { field: 'room_id', header: 'Room ID' },
      { field: 'status', header: 'Status' },
    ];
  }
}
