export interface GetAllUserDto {
  user_id : number;
  username: string;
  email : string;
  create_time: string;
  order_description: string;
  reservation_start_time :string;
  reservation_end_time: string;
  room_id : number;
  status: string;
}
