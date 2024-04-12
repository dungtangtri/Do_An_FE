import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GetAllUserWithReservationDto} from "../models/get-all-user-with-reservation-dto";
import {BaseSearchForm} from "../../shared/BaseSearchForm";
const API_URL = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  getAllUser(searchForm: BaseSearchForm) {
    return this.http.post<GetAllUserWithReservationDto[]>(API_URL + 'get-all-user-reservations', searchForm);
  }
}
