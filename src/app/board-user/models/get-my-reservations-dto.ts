export interface GetMyReservationsDto {
  reservation_id: number;
  create_time: string;
  reservation_description: string;
  reservation_start_time: string;
  reservation_end_time: string;
  class_location: string;
  status: string;
}
