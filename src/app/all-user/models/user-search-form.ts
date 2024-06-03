import {BaseSearchForm} from "../../shared/BaseSearchForm";

export interface UserSearchForm extends BaseSearchForm{
  userRole: string[];
}
