import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserGetMyReservationsComponent } from './board-user/user-get-my-reservations.component';
import { AllUserComponent } from './all-user/all-user.component';
import { AdminGetAllReservationsComponent } from './admin-get-all-users-reservations/admin-get-all-reservations.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-reservation', component: UserGetMyReservationsComponent },
  { path: 'manage-user', component: AllUserComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'manage-reservation', component: AdminGetAllReservationsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
