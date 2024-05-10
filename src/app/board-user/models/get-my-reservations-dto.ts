export interface GetMyReservationsDto {
  reservation_id: number;
  create_time: string;
  reservation_description: string;
  reservation_start_time: string;
  reservation_end_time: string;
  room_id: number;
  status: string;
}
