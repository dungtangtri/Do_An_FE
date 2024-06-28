import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {
  AdminGetAllReservationsComponent
} from './admin-get-all-users-reservations/admin-get-all-reservations.component';
import {AllUserComponent} from './all-user/all-user.component';
import {UserGetMyReservationsComponent} from './board-user/user-get-my-reservations.component';
import {TableModule} from 'primeng/table';
import {httpInterceptorProviders} from './_helpers/http.interceptor';
import {ImageModule} from "primeng/image";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextModule} from "primeng/inputtext";
import {DateFormatPipe} from './date-format.pipe';
import {TagModule} from "primeng/tag";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {TabViewModule} from "primeng/tabview";
import {CalendarModule} from "primeng/calendar";
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from "primeng/toast";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {ToolbarModule} from "primeng/toolbar";
import {StyleClassModule} from 'primeng/styleclass';
import {CheckboxModule} from "primeng/checkbox";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {RippleModule} from "primeng/ripple";
import { PlaceReservationComponent } from './place-reservation/place-reservation.component';
import {PanelModule} from "primeng/panel";
import { CalendarModule as Calendar, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoUtilsModule } from './demo-utils/module';
import {MultiSelectModule} from "primeng/multiselect";
import {PasswordModule} from "primeng/password";
import {BadgeModule} from "primeng/badge";
import {NgOptimizedImage} from "@angular/common";
import {TriStateCheckboxModule} from "primeng/tristatecheckbox";
import {KeyFilterModule} from "primeng/keyfilter";
import {CardModule} from "primeng/card";
import { ManageClassroomComponent } from './manage-classroom/manage-classroom.component';
import {SliderModule} from "primeng/slider";
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {SplitterModule} from "primeng/splitter";
import { GetClassroomCalendarInAWeekComponent } from './get-classroom-calendar-in-a-week/get-classroom-calendar-in-a-week.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

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
    AdminDashboardComponent,
    PlaceReservationComponent,
    ManageClassroomComponent,
    NotFoundPageComponent,
    GetClassroomCalendarInAWeekComponent,
    UserChangePasswordComponent,
    UserResetPasswordComponent,
    ForgotPasswordComponent,
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
        PanelModule,
        BrowserAnimationsModule,
        DemoUtilsModule,
        Calendar.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
        MultiSelectModule,
        PasswordModule,
        BadgeModule,
        NgOptimizedImage,
        TriStateCheckboxModule,
        KeyFilterModule,
        CardModule,
        SliderModule,
        SplitterModule,

    ],
  providers: [httpInterceptorProviders,ConfirmationService],
  bootstrap: [AppComponent]

})
export class AppModule { }
