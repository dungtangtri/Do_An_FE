import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetMyReservationsDto} from '../board-user/models/get-my-reservations-dto';
import {ChangeStatusForm} from '../util/shared/ChangeStatusForm';
import {API} from "../util/shared/API";
import {PlaceReservationForm} from "../place-reservation/models/place-reservation-form";
import {UserSearchForm} from "../all-user/models/user-search-form";
import {GetClassroomListDTO} from "../board-user/models/GetClassroomListDTO";
import {GetRoomSuggestionForm} from "../place-reservation/models/get-room-suggestion-form";
import {GetRoomSuggestionsDto} from "../place-reservation/models/get-room-suggestions-dto";
import {GetAllReservationsByWeekDto} from "../get-classroom-calendar-in-a-week/models/get-all-reservations-by-week-dto";
import {
  GetAllReservationsByWeekSearchForm
} from "../get-classroom-calendar-in-a-week/models/get-all-reservations-by-week-search-form";
import {UserChangePasswordRequest} from "../user-change-password/models/user-change-password-request";
import {UserResetPasswordRequest} from "../user-reset-password/models/user-reset-password-request";
import {ForgotPasswordRequest} from "../forgot-password/models/forgot-password-request";

const API_URL = API.USER_API;
const PUBLIC_URL = API.GENERAL_API;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getMyReservation(searchForm: UserSearchForm) {
    return this.http.post<GetMyReservationsDto[]>(
      API_URL + 'get-current-user-reservations',
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
  exportGetCurrentUserReservations(searchForm: UserSearchForm) {
    return this.http.post(
      API_URL + 'export-current-user-reservations',
      searchForm,
      { responseType: 'blob' },
    );
  }
  placeReservation(searchForm: PlaceReservationForm){
    return this.http.post(
      API_URL + 'placeReservation',
      searchForm,
      { responseType: 'text' },
    );
  }

  getClassroomList() {
    return this.http.get<GetClassroomListDTO[]>(
      PUBLIC_URL + 'public/user-get-all-classroom'
    );
  }

  getRoomSuggestion(searchForm: GetRoomSuggestionForm) {
    return this.http.post<GetRoomSuggestionsDto[]>(
      API_URL + 'find-suitable-room',
      searchForm,
    );
  }

  getAllReservationsByWeek(searchForm: GetAllReservationsByWeekSearchForm) {
    return this.http.post<GetAllReservationsByWeekDto[]>(
      PUBLIC_URL + 'public/get-all-reservations-by-week',
      searchForm,
    );
  }

  userChangePassword(request: UserChangePasswordRequest) {
    return this.http.post(
      API_URL + 'change-password',
      request,
      {responseType: 'text'},
    );
  }

  userResetPassword(request: UserResetPasswordRequest) {
    return this.http.post(
      API_URL + 'public/verify-reset-password',
      request,
      {responseType: 'text'},
    );
  }
  userForgotPassword(request: ForgotPasswordRequest) {
    return this.http.post(
      API_URL + 'public/forgot-password',
      request,
      {responseType: 'text'},
    );
  }
}
