import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CONSTANTS} from "../board-user/utils/CONSTANTS";
import {FormGroup} from "@angular/forms";
import {Util} from "../util/util.class";
import {AdminService} from "../admin-get-all-users-reservations/service/admin.service";
import {GetAllClassroomSearchForm} from "./models/GetAllClassroomSearchForm";
import {GetAllClassroomDTO} from "./models/GetAllClassroomDTO";
import {UpdateClassroomDetailsRequest} from "../admin-dashboard/models/update-classroom-details-request";
import {AddNewClassroomRequest} from "./models/AddNewClassroomRequest";

@Component({
  selector: 'app-manage-classroom',
  templateUrl: './manage-classroom.component.html',
  styleUrls: ['./manage-classroom.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ManageClassroomComponent implements OnInit {
  readonly CLASSROOM_FORM_CONTROL = CONSTANTS.CLASSROOM_FORM_CONTROL_NAME;
  readonly ADD_NEW_CLASSROOM_FORM_CONTROL = CONSTANTS.ADD_NEW_CLASSROOM_FORM_CONTROL_NAME;
  formSearch: FormGroup;
  formAddNew: FormGroup;
  rangeValue = [0, 100];
  blockSpace: RegExp = /[^\s]/;
  havePowerOutlet = [{id: 0, name: 'No'}, {id: 1, name: 'Yes'}];
  building = [{id: 'D6', name: 'D6'}, {id: 'D8', name: 'D8'}, {id: 'D4', name: 'D4'}]
  data: any;
  cols: any;
  isEditRoom = false;
  roomID: any;
  today: any;
  classLocation : any;
  currentBuilding: any;
  currentRoom : any;
  classCapacity: any;
  changePowerOutlet: any;
  isAddNewClassroom = false;
  constructor(private adminService: AdminService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.formSearch = Util.createFormGroup(CONSTANTS.CLASSROOM_FORM_CONTROL_NAME);
    this.formAddNew = Util.createFormGroup(CONSTANTS.ADD_NEW_CLASSROOM_FORM_CONTROL_NAME);
  }

  ngOnInit() {
    this.today = new Date();
    this.getData();
    this.cols = [
      {field: 'no', header: 'No'},
      {field: 'id', header: 'Classroom ID'},
      {field: 'class_location', header: 'Classroom Location'},
      {field: 'class_capacity', header: 'Classroom Capacity'},
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
    this.rangeValue = [0,100];
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
          detail: err.error,
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
    const parts = data.class_location.split('-');
    this.currentBuilding = parts[0];
    this.currentRoom = parts[1];
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
    let request: UpdateClassroomDetailsRequest = {classCapacity: this.classCapacity, classLocation: this.currentBuilding + '-' + this.currentRoom, classId: this.roomID, powerOutlet: this.changePowerOutlet}
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
  openAddNewClassroom(){
    this.isAddNewClassroom = true;
  }
  saveNewClassroom(){
    const request: AddNewClassroomRequest = Util.getDataFormSearch(this.formAddNew);
    this.adminService.addNewClassroom(request).subscribe({
      next: (data) => {
        this.formAddNew.reset();
        this.isAddNewClassroom = false;
        this.getData()
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully Add New Classroom ',
        });
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
}
