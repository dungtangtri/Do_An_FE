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
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {TableModule} from 'primeng/table';
import {httpInterceptorProviders} from './_helpers/http.interceptor';
import {ImageModule} from "primeng/image";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextModule} from "primeng/inputtext";
import { DateFormatPipe } from './date-format.pipe';
import {TagModule} from "primeng/tag";
import { ApproveReservationsComponent } from './approve-reservations/approve-reservations.component';
import {DropdownModule} from "primeng/dropdown";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {TabViewModule} from "primeng/tabview";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    DateFormatPipe,
    ApproveReservationsComponent,
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
    DropdownModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    TabViewModule,
    CalendarModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
