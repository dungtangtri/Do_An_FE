import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetMyReservationsDto} from '../board-user/models/get-my-reservations-dto';
import {ChangeStatusForm} from '../shared/ChangeStatusForm';
import {API} from "../shared/API";
import {PlaceReservationForm} from "../place-reservation/models/place-reservation-form";
import {UserSearchForm} from "../all-user/models/user-search-form";
import {GetClassroomListDTO} from "../board-user/models/GetClassroomListDTO";
import {GetRoomSuggestionForm} from "../place-reservation/models/get-room-suggestion-form";
import {GetRoomSuggestionsDto} from "../place-reservation/models/get-room-suggestions-dto";
import {GetAllReservationSearchForm} from "../admin-get-all-users-reservations/models/get-all-reservation-search-form";
import {GetAllReservationsByWeekDto} from "../get-classroom-calendar-in-a-week/models/get-all-reservations-by-week-dto";
import {
  GetAllReservationsByWeekSearchForm
} from "../get-classroom-calendar-in-a-week/models/get-all-reservations-by-week-search-form";

const API_URL = API.GENERAL_API;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getMyReservation(searchForm: UserSearchForm) {
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
      API_URL + 'public/user-get-all-classroom'
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
      API_URL + 'public/get-all-reservations-by-week',
      searchForm,
    );
  }

}
