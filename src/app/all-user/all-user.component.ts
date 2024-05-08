import {Component, OnInit} from '@angular/core';
import {ConfirmationService, FilterMatchMode, MessageService, SelectItem} from "primeng/api";
import {CONSTANTS} from "../board-user/utils/CONSTANTS";
import {FormGroup} from "@angular/forms";
import {AdminService} from "../admin-get-all-users-reservations/service/admin.service";
import {Util} from "../util/util.class";
import {BaseSearchForm} from "../shared/BaseSearchForm";
import {AllUserInformationDto} from "./models/all-user-information-dto";

@Component({
  selector: 'app-board-moderator',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AllUserComponent implements OnInit {
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  content : AllUserInformationDto[] = [];
  cols : any[] = [];
  formSearch: FormGroup;
  matchModeOptions: SelectItem[] = [];
  constructor(private adminService: AdminService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
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
      { field: 'no', header: 'No.' },
      { field: 'user_id', header: 'User ID' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'created_at', header: 'Created at' },
      { field: 'user_role', header: 'User Role'},
      { field: 'action', header: 'Action'}
    ];
  }
  getData(){
    const searchForm : BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    this.adminService.getAllUsersInformation(searchForm).subscribe({
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

  deleteUser(data: AllUserInformationDto) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user? This can not be undone.',
      header:'Delete User',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptDelete(data);
      }
    });
  }

  acceptDelete(data: AllUserInformationDto) {
    const id = data.user_id;
    this.adminService.deleteUser(id).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Delete Successfully', detail: 'You have deleted successfully' });
        this.getData();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Delete Unsuccessfully', detail: 'You have deleted unsuccessfully' });
      }
    })
  }

  exportExcel() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to export the data?',
      header: 'Export Excel',
      icon: 'pi pi-exclamation-circle color-red',
      accept: () => {
        this.acceptExport();
      }
    });
  }

  acceptExport() {
    const searchForm: BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    this.adminService.exportAllUserInformation(searchForm).subscribe({
      next: res => {
        if (res) {
          Util.checkExportFile(res, "All_User_Information");
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully export data',
            detail: 'Successfully export data from the server.'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error export data',
            detail: 'Error exporting data from the server, please try again later.'
          });
        }
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error export data',
          detail: 'Error exporting data from the server, please try again later.'
        });
      }
    });
  }
  resetForm(){
    this.formSearch.reset();
    this.getData();
  }
}
