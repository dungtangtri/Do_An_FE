import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService,} from 'primeng/api';
import {CONSTANTS} from '../board-user/utils/CONSTANTS';
import {FormGroup} from '@angular/forms';
import {AdminService} from '../admin-get-all-users-reservations/service/admin.service';
import {Util} from '../util/util.class';
import {AllUserInformationDto} from './models/all-user-information-dto';
import {UserSearchForm} from "./models/user-search-form";
import {UserRegisterForm} from "./models/user-register-form";
import {UpdateUserInformationDto} from "./models/update-user-information-dto";

@Component({
  selector: 'app-board-moderator',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AllUserComponent implements OnInit {
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  readonly REGISTRATION_FORM_CONTROL = CONSTANTS.REGISTRATION_FORM_CONTROL_NAME;
  content: AllUserInformationDto[] = [];
  cols: any[] = [];
  formSearch: FormGroup;
  formRegister: FormGroup;
  isValidSearchForm = true;
  isAddNewUser = false;
  isValidAddUserForm = true;
  isMatchPassword = true;
  isVisibleEditUser = false;
  currentUsername: any;
  currentEmail: any;
  newPassword: any;
  currentUserRole: any;
  currentUserId: any;
  confirmPassword:any;
  confirmPasswordError: boolean = false;
  isConfirm = false;
  blockSpace: RegExp = /[^\s]/;
  today: any;
  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.today = new Date();
    this.formSearch = Util.createFormGroup(CONSTANTS.SEARCH_FORM_CONTROL_NAME);
    this.formRegister = Util.createFormGroup(CONSTANTS.REGISTRATION_FORM_CONTROL_NAME);
  }
  role = [{id:'ROLE_ADMIN', name:'ROLE_ADMIN'},{id:'ROLE_STUDENT', name:'ROLE_STUDENT'},{id:'ROLE_TEACHER',name:'ROLE_TEACHER'}]
  ngOnInit(): void {
    this.getData();
    this.cols = [
      { field: 'no', header: 'No.' },
      { field: 'user_id', header: 'User ID' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'created_at', header: 'Created at' },
      { field: 'user_role', header: 'User Role' },
      { field: 'action', header: 'Action' },
    ];
  }
  getData() {
    const searchForm: UserSearchForm = Util.getDataFormSearch(this.formSearch);
    this.adminService.getAllUsersInformation(searchForm).subscribe({
      next: (data) => {
        this.content = data;
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

  deleteUser(data: AllUserInformationDto) {
    this.confirmationService.confirm({
      message:
        'Are you sure that you want to delete this user? This can not be undone.',
      header: 'Delete User',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptDelete(data);
      },
    });
  }

  acceptDelete(data: AllUserInformationDto) {
    const id = data.user_id;
    this.adminService.deleteUser(id).subscribe({
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
    const searchForm: UserSearchForm = Util.getDataFormSearch(this.formSearch);
    this.adminService.exportAllUserInformation(searchForm).subscribe({
      next: (res) => {
        if (res) {
          Util.checkExportFile(res, 'All_User_Information');
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully export data',
            detail: 'Successfully export data from the server.',
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
    this.isValidSearchForm = true;
    this.getData();
  }
  validateTime() {
    const startDate = this.formSearch.get(this.SEARCH_FORM_CONTROL.START_DATE.NAME)?.value;
    const endDate = this.formSearch.get(this.SEARCH_FORM_CONTROL.END_DATE.NAME)?.value;

    if (startDate && endDate) {
      this.isValidSearchForm = startDate < endDate;
    } else if (startDate && !endDate) {
      this.isValidSearchForm = true; // Consider it valid if only start date is set and end date is not set
    } else {
      this.isValidSearchForm = true; // Consider it valid if neither date is set
    }
  }

  validatePassword() {
    if (this.formRegister.get('password')?.value === this.formRegister.get('confirmPassword')?.value) {
      this.isMatchPassword = true;
      this.isValidAddUserForm = true;
    } else if (this.formRegister.get('password')?.value !== this.formRegister.get('confirmPassword')?.value) {
      this.isMatchPassword = false;
      this.isValidAddUserForm = false;
    }
  }

  submitForm() {
    const registerForm: UserRegisterForm = Util.getDataFormSearch(this.formRegister);
    this.adminService.registerAdmin(registerForm).subscribe({
      next: (data) => {
        this.formRegister.reset();
        this.isAddNewUser = false;
        this.getData()
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully Sign Up ',
          detail: data.message
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err.error,
        });
      },
    });
  }

  editUser(data: AllUserInformationDto) {
    this.isVisibleEditUser = true;
    this.updateUserData(data)
  }

  updateUserData(data: AllUserInformationDto) {
    this.currentUserId = data.user_id;
    this.currentUserRole = data.user_role;
    this.currentEmail = data.email;
    this.currentUsername = data.username;
  }
  updateUser(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to update this user information?',
      header: 'Update Reservation',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptUpdateUser();
      },
    });
  }
  validatePasswordEditUser() {
    this.confirmPasswordError = this.newPassword !== this.confirmPassword;
  }
  acceptUpdateUser(){
    let updateForm: UpdateUserInformationDto = {username:this.currentUsername, password: this.newPassword, role:this.currentUserRole};
    this.adminService.updateUserInformation(updateForm).subscribe({
      next: (res) => {
        console.log(res);
        this.isVisibleEditUser = false;
        this.isConfirm = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully updating user information',
        });
        this.getData();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error updating user information',
        });
      },
    });
  }

}
