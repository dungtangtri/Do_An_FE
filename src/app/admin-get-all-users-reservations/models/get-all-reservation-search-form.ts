import {BaseSearchForm} from "../../shared/BaseSearchForm";

export interface GetAllReservationSearchForm extends BaseSearchForm{
  status: string[];
  username: string;
  roomId: number;
  reservationDate: number;
}
