import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetAllUserWithReservationDto } from '../models/get-all-user-with-reservation-dto';
import { BaseSearchForm } from '../../shared/BaseSearchForm';
import { AllUserInformationDto } from '../../all-user/models/all-user-information-dto';
import { SummaryReservationsByStatusDto } from '../../admin-dashboard/models/summary-reservations-by-status-dto';
import { API } from '../../shared/API';
import { UpdateReservationDetailForm } from '../models/update-reservation-detail-form';
import {UserSearchForm} from "../../all-user/models/user-search-form";
import {UserRegisterForm} from "../../all-user/models/user-register-form";
import {UpdateUserInformationDto} from "../../all-user/models/update-user-information-dto";
import {SummaryUserRoleDto} from "../../admin-dashboard/models/summary-user-role-dto";
import {GetNumberOfReservationsByYearSearchForm} from "../models/get-number-of-reservations-by-year-search-form";
import {GetNumberOfReservationsByYearDto} from "../models/get-number-of-reservations-by-year-dto";
import {GetAllClassroomSearchForm} from "../../manage-classroom/models/GetAllClassroomSearchForm";
import {GetAllClassroomDTO} from "../../manage-classroom/models/GetAllClassroomDTO";
import {UpdateClassroomDetailsRequest} from "../../admin-dashboard/models/update-classroom-details-request";
import {AddNewClassroomRequest} from "../../manage-classroom/models/AddNewClassroomRequest";
import {GetAllReservationSearchForm} from "../models/get-all-reservation-search-form";
const API_URL = API.GENERAL_API;
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  getAllReservations(searchForm: GetAllReservationSearchForm) {
    return this.http.post<GetAllUserWithReservationDto[]>(
      API_URL + 'get-all-user-reservations',
      searchForm,
    );
  }
  deleteReservation(id: number) {
    return this.http.post(API_URL + 'deleteReservation', id, {
      responseType: 'text',
    });
  }
  getAllUsersInformation(searchForm: UserSearchForm) {
    return this.http.post<AllUserInformationDto[]>(
      API_URL + 'get-all-user',
      searchForm,
    );
  }
  exportGetAllReservations(searchForm: GetAllReservationSearchForm) {
    return this.http.post(
      API_URL + 'export-get-all-user-reservations',
      searchForm,
      { responseType: 'blob' },
    );
  }
  exportAllUserInformation(searchForm: UserSearchForm) {
    return this.http.post(API_URL + 'export-all-user-information', searchForm, {
      responseType: 'blob',
    });
  }
  deleteUser(id: number) {
    return this.http.post(API_URL + 'delete_user', id, {
      responseType: 'text',
    });
  }
  getSummaryReservationsByStatus(searchForm: BaseSearchForm) {
    return this.http.post<SummaryReservationsByStatusDto>(
      API_URL + 'get-summary-reservations-by-status',
      searchForm,
    );
  }
  getSummaryUserRole(searchForm: BaseSearchForm) {
    return this.http.post<SummaryUserRoleDto>(
      API_URL + 'get-summary-user-by-role',
      searchForm,
    );
  }

  updateReservationDetail(form: UpdateReservationDetailForm) {
    return this.http.post(API_URL + 'update-reservation-detail', form, {
      responseType: 'text',
    });
  }
  approveMultipleReservation(ids: number[]){
    return this.http.post(API_URL + 'multiple-approve' , ids , {
      responseType: 'text'
    })
  }
  registerAdmin(form : UserRegisterForm): Observable<any>{
    return this.http.post(
      API.AUTH_API + 'signup',
      form,
    );
  }
  updateUserInformation(form: UpdateUserInformationDto){
    return this.http.post(
      API_URL + 'edit-user',
      form,
      {
        responseType: 'text'
      }
    )
  }
  getNumberOfReservationByYear(form: GetNumberOfReservationsByYearSearchForm): Observable<GetNumberOfReservationsByYearDto[]>{
    return this.http.post<GetNumberOfReservationsByYearDto[]>(
      API_URL + 'get-number-of-reservations',
      form
    )
  }
  getAllClassroom(form: GetAllClassroomSearchForm){
    return this.http.post<GetAllClassroomDTO>(
      API_URL + 'get-all-classroom',
      form
    )
  }
  deleteClassroom(id: number){
    return this.http.post(
      API_URL + 'delete-room-by-id',
      id,
      {
        responseType: 'text'
      }
    )
  }
  updateClassroomDetail(form: UpdateClassroomDetailsRequest){
    return this.http.post(
      API_URL + 'edit-room',
      form,
      {
        responseType: 'text'
      }
    )
  }
  addNewClassroom(form: AddNewClassroomRequest){
    return this.http.post(
      API_URL + 'add-room',
      form,
      {
        responseType: 'text'
      }
    )
  }
  downloadExcelTemplate() {
    return this.http.get(
      API_URL + 'download-import-reservations-template',
      { responseType: 'blob' },
    );
  }
  importExcel(file: File): Observable<string[]>{
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string[]>(API_URL + 'import-reservations', formData );
  }
}
