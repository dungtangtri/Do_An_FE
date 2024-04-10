import { Component, OnInit } from '@angular/core';
import {AdminService} from "./service/admin.service";
import {GetAllUserDto} from "./models/get-all-user-dto";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content : GetAllUserDto[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUser().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
