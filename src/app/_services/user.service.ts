import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseSearchForm } from '../shared/BaseSearchForm';
import { GetMyReservationsDto } from '../board-user/models/get-my-reservations-dto';
import { ChangeStatusForm } from '../shared/ChangeStatusForm';
import {API} from "../shared/API";

const API_URL = API.GENERAL_API;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getMyReservation(searchForm: BaseSearchForm) {
    return this.http.post<GetMyReservationsDto[]>(
      API_URL + 'get_user_profile',
      searchForm,
    );
  }
  changeStatusReservation(changeStatusForm: ChangeStatusForm) {
    return this.http.post(
      API_URL + 'change-status-my-reservation',
      changeStatusForm,
      { responseType: 'text' },
    );
  }
  exportGetCurrentUserReservations(searchForm: BaseSearchForm) {
    return this.http.post(
      API_URL + 'export-current-user-reservations',
      searchForm,
      { responseType: 'blob' },
    );
  }
}
