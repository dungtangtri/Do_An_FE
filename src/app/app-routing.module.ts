import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {UserGetMyReservationsComponent} from './board-user/user-get-my-reservations.component';
import {AllUserComponent} from './all-user/all-user.component';
import {
  AdminGetAllReservationsComponent
} from './admin-get-all-users-reservations/admin-get-all-reservations.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {PlaceReservationComponent} from './place-reservation/place-reservation.component';
import {ManageClassroomComponent} from "./manage-classroom/manage-classroom.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";
import {
  GetClassroomCalendarInAWeekComponent
} from "./get-classroom-calendar-in-a-week/get-classroom-calendar-in-a-week.component";
import {UserChangePasswordComponent} from "./user-change-password/user-change-password.component";
import {UserResetPasswordComponent} from "./user-reset-password/user-reset-password.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {VerifyUserSuccessfulComponent} from "./verify-user-successful/verify-user-successful.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-reservation', component: UserGetMyReservationsComponent },
  { path: 'manage-user', component: AllUserComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'manage-reservation', component: AdminGetAllReservationsComponent },
  { path: 'place-reservation', component: PlaceReservationComponent },
  { path: 'manage-classroom', component: ManageClassroomComponent },
  { path: 'view-classroom-calendar', component: GetClassroomCalendarInAWeekComponent},
  { path: 'change-password', component: UserChangePasswordComponent},
  { path: 'verify-reset-password', component: UserResetPasswordComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'verify-registration', component: VerifyUserSuccessfulComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
