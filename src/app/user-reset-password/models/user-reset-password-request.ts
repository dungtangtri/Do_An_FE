export interface UserResetPasswordRequest{
  token: string,
  newPassword: string,
  confirmPassword: string
}
