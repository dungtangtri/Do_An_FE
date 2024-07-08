import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {CalendarEvent, CalendarView} from "angular-calendar";
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {UserService} from "../auth-service/user.service";
import {MessageService} from "primeng/api";
import {GetAllReservationsByWeekSearchForm} from "./models/get-all-reservations-by-week-search-form";

@Component({
  selector: 'app-get-classroom-calendar-in-a-week',
  templateUrl: './get-classroom-calendar-in-a-week.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./get-classroom-calendar-in-a-week.component.css']
})
export class GetClassroomCalendarInAWeekComponent implements OnInit, OnDestroy {

  todayInMilli: any;

  aWeekAhead: any;

  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  daysInWeek = 7;

  private destroy$ = new Subject<void>();

  events: CalendarEvent[] = [];

  roomId: any;

  classroomList: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private userService: UserService,
    private messageService: MessageService,
  ) {
    const now = new Date();
    this.todayInMilli = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    this.aWeekAhead = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7).getTime();
  }

  ngOnInit() {
    this.getClassroomList();
    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({breakpoint}) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({breakpoint}) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 7;
        }
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  getData() {
    const searchForm: GetAllReservationsByWeekSearchForm = {
      reservationStartDate: this.todayInMilli,
      reservationEndDate: this.aWeekAhead,
      roomId: this.roomId
    };
    this.userService.getAllReservationsByWeek(searchForm).subscribe({
      next: (data) => {
        // Filter all accepted reservations
        this.events = data.map(reservation => ({
          start: new Date(reservation.reservation_start_time),
          end: new Date(reservation.reservation_end_time),
          title: 'Reserved from: ' + new Date(reservation.reservation_start_time) + ' to ' + new Date(reservation.reservation_end_time)
        }));
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully retrieving data',
          detail: 'Successfully retrieving data from the server.',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error retrieving data',
          detail:
            'Error retrieving data from the server, please try again later.',
        });
      },
    });
  }

  // Lấy list phòng học
  getClassroomList() {
    this.userService.getClassroomList().subscribe({
      next: (res) => {
        this.classroomList = res.map(classroom => ({
          id: classroom.id,
          name: classroom.classLocation
        }));
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'An error happened when retrieving classroom list. Please try again later',
        });
      },
    });
  }
}
