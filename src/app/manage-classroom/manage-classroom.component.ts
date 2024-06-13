import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CONSTANTS} from "../board-user/utils/CONSTANTS";
import {FormGroup} from "@angular/forms";
import {Util} from "../util/util.class";
import {AdminService} from "../admin-get-all-users-reservations/service/admin.service";
import {GetAllClassroomSearchForm} from "./models/GetAllClassroomSearchForm";
import {GetAllClassroomDTO} from "./models/GetAllClassroomDTO";
import {UpdateClassroomDetailsRequest} from "../admin-dashboard/models/update-classroom-details-request";

@Component({
  selector: 'app-manage-classroom',
  templateUrl: './manage-classroom.component.html',
  styleUrls: ['./manage-classroom.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ManageClassroomComponent implements OnInit {
  readonly CLASSROOM_FORM_CONTROL = CONSTANTS.CLASSROOM_FORM_CONTROL_NAME;
  formSearch: FormGroup;
  rangeValue = [0, 100];
  blockSpace: RegExp = /[^\s]/;
  havePowerOutlet = [{id: 0, name: 'No'}, {id: 1, name: 'Yes'}];
  data: any;
  cols: any;
  isEditRoom = false;
  roomID: any;
  classLocation : any;
  classCapacity: any;
  changePowerOutlet: any;
  isValidEditRoom = true;
  constructor(private adminService: AdminService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.formSearch = Util.createFormGroup(CONSTANTS.CLASSROOM_FORM_CONTROL_NAME)
  }

  ngOnInit() {
    this.getData()
    this.cols = [
      {field: 'no', header: 'No'},
      {field: 'id', header: 'Class ID'},
      {field: 'class_location', header: 'Class Location'},
      {field: 'class_capacity', header: 'Class Capacity'},
      {field: 'power_outlet', header: 'Has Power Outlet?'},
      {field: 'action', header: 'Action'}
    ];
  }

  getData() {
    const powerOutlet = this.formSearch.get("powerOutlet")?.value;
    const classLocation = this.formSearch.get("classLocation")?.value;
    const form: GetAllClassroomSearchForm = {
      classLocation: classLocation,
      powerOutlet: powerOutlet,
      roomCapacity: this.rangeValue
    };
    this.adminService.getAllClassroom(form).subscribe({
      next: (data) => {
        this.data = data;
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

  resetForm() {
    this.formSearch.reset();
    this.getData();
  }

  deleteRoom(data: GetAllClassroomDTO) {
    this.confirmationService.confirm({
      message:
        'Are you sure that you want to delete this room? This can not be undone.',
      header: 'Delete Reservation',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptDelete(data);
      },
    });
  }

  acceptDelete(data: GetAllClassroomDTO) {
    const id = data.id;
    this.adminService.deleteClassroom(id).subscribe({
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

  editRoom(data: GetAllClassroomDTO) {
    this.isEditRoom = true;
    this.getRoomData(data);
  }
  getRoomData(data: GetAllClassroomDTO){
    this.roomID = data.id;
    this.classLocation = data.class_location;
    this.changePowerOutlet = data.power_outlet;
    this.classCapacity = data.class_capacity;
  }
  updateRoomData(){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to update this classroom details?',
        header: 'Update Reservation',
        icon: 'pi pi-exclamation-circle color-red',
        accept: () => {
          this.acceptUpdateClassroom();
        },
      });
  }
  acceptUpdateClassroom(){
    let request: UpdateClassroomDetailsRequest = {classCapacity: this.classCapacity, classLocation: this.classLocation, classId: this.roomID, powerOutlet: this.changePowerOutlet}
    this.adminService.updateClassroomDetail(request).subscribe({
      next: (res) => {
        this.isEditRoom = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully updating classroom detail',
        });
        this.getData();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: err.error,
        });
      },
    });
  }
  addNewClassroom(){

  }
}
