import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetAllUserWithReservationDto } from '../models/get-all-user-with-reservation-dto';
import { BaseSearchForm } from '../../shared/BaseSearchForm';
import { AllUserInformationDto } from '../../all-user/models/all-user-information-dto';
const API_URL = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  getAllReservations(searchForm: BaseSearchForm) {
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
  getAllUsersInformation(searchForm: BaseSearchForm) {
    return this.http.post<AllUserInformationDto[]>(
      API_URL + 'get-all-user',
      searchForm,
    );
  }
  exportGetAllReservations(searchForm: BaseSearchForm) {
    return this.http.post(
      API_URL + 'export-get-all-user-reservations',
      searchForm,
      { responseType: 'blob' },
    );
  }
  exportAllUserInformation(searchForm: BaseSearchForm) {
    return this.http.post(API_URL + 'export-all-user-information', searchForm, {
      responseType: 'blob',
    });
  }
  deleteUser(id: number) {
    return this.http.post(API_URL + 'delete_user', id, {
      responseType: 'text',
    });
  }
}
