import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GetAllUserDto} from "../models/get-all-user-dto";
const API_URL = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  getAllUser() {
    return this.http.get<GetAllUserDto[]>(API_URL + 'get-all-user', { responseType: 'json' });
  }
}
