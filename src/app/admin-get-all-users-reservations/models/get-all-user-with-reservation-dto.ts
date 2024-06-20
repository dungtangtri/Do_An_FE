export interface GetAllUserWithReservationDto {
  reservation_id: number;
  username: string;
  email: string;
  create_time: string;
  reservation_description: string;
  reservation_start_time: string;
  reservation_end_time: string;
  class_location: string;
  status: string;
  user_role: string;
}
