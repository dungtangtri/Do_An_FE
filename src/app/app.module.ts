import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGetAllReservationsComponent } from './admin-get-all-users-reservations/admin-get-all-reservations.component';
import { AllUserComponent } from './all-user/all-user.component';
import { UserGetMyReservationsComponent } from './board-user/user-get-my-reservations.component';
import { TableModule } from 'primeng/table';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { DateFormatPipe } from './date-format.pipe';
import { TagModule } from 'primeng/tag';
import { ApproveReservationsComponent } from './approve-reservations/approve-reservations.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { StyleClassModule } from 'primeng/styleclass';
import { CheckboxModule } from 'primeng/checkbox';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminGetAllReservationsComponent,
    AllUserComponent,
    UserGetMyReservationsComponent,
    DateFormatPipe,
    ApproveReservationsComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ImageModule,
    ButtonModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    TagModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    TabViewModule,
    CalendarModule,
    ConfirmPopupModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    DialogModule,
    ToolbarModule,
    StyleClassModule,
    CheckboxModule,
    ChartModule,
    DropdownModule,
    RippleModule,
  ],
  providers: [httpInterceptorProviders, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
