import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseSearchForm} from "../shared/BaseSearchForm";
import {GetMyReservationsDto} from "../board-user/models/get-my-reservations-dto";
import {ChangeStatusForm} from "../shared/ChangeStatusForm";

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'get-all-user', { responseType: 'json' });
  }

  getMyReservation(searchForm: BaseSearchForm) {
    return this.http.post<GetMyReservationsDto[]>(API_URL + 'get_user_profile', searchForm);
  }
  changeStatusReservation(changeStatusForm: ChangeStatusForm) {
    return this.http.post(API_URL + 'change-status-my-reservation', changeStatusForm,{responseType: 'text'});
  }
  exportGetCurrentUserReservations(searchForm: BaseSearchForm) {
    return this.http.post(API_URL + 'export-current-user-reservations',searchForm, {responseType: 'blob'});
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }


}
