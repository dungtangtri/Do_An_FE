import {BaseSearchForm} from "../../util/shared/BaseSearchForm";

export interface UserSearchForm extends BaseSearchForm{
  status: string[];
  roomId: number;
  reservationDate: number;
  username: string;
}
