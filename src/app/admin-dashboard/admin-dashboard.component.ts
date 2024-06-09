import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CONSTANTS} from "../board-user/utils/CONSTANTS";
import {FormGroup} from "@angular/forms";
import {Util} from "../util/util.class";
import {AdminService} from "../admin-get-all-users-reservations/service/admin.service";
import {BaseSearchForm} from "../shared/BaseSearchForm";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AdminDashboardComponent implements OnInit {
  readonly SEARCH_FORM_CONTROL = CONSTANTS.SEARCH_FORM_CONTROL_NAME;
  formSearch: FormGroup;
  data: any;
  data2: any;
  data3: any;
  chartOptions: any;
  totalReservation: any;
  totalReservationToday: any;
  unprocessedReservation: any;
  totalUser: any;
  option3: any;
  newUserThisMonth: any;
  unprocessReservationToday: any;
  acceptedReservationToday: any;
  acceptedReservation: any;
  customColor = ['#ffc700', '#0fb215', '#e53131'];
  customColorUserRole = ['#6A1B9A', '#E64A19', '#00838F']
  constructor(private adminService: AdminService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.formSearch = Util.createFormGroup(CONSTANTS.SEARCH_FORM_CONTROL_NAME)
  }

  statusSummary: any;
  userSummary: any
  ngOnInit(): void {
    this.generatePieChart1();
    this.generatePieChart2();
    this.generateLineChart();
    this.getNewUserThisMonth();
    this.getNewReservationToday();
    this.getUnprocessReservationToday();
    this.getNumberOfReservations();
    this.getNumberOfUsers();
    this.getAcceptedReservationToday();
    this.getNumberOfAcceptedReservations()
  }

  onSearch() {
    this.generatePieChart1();
    this.generatePieChart2();
    this.generateLineChart()
  }
  resetForm() {
    this.formSearch.reset();
    this.generatePieChart1();
    this.generatePieChart2();
    this.generateLineChart()
  }

  async generatePieChart1() {
    const result = await this.getSummaryReservationsByStatus();
    if (result) {
      const accepted = result.accepted;
      const processing = result.processing;
      const rejected = result.rejected;
      this.statusSummary = [processing, accepted, rejected]
      this.data = {
        labels: ['Processing', 'Accepted', 'Rejected'],
        datasets: [
          {
            backgroundColor: this.customColor,
            data: this.statusSummary,
          }
        ]
      };
    }
    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
          }
        }
      }
    };
  }

  async generatePieChart2() {
    const result = await this.getSummaryUserByRole();
    if (result) {
      const adminRole = result.admin_role;
      const studentRole = result.student_role;
      const teacherRole = result.teacher_role;
      this.userSummary = [adminRole, teacherRole, studentRole]
      this.data2 = {
        labels: ['Admin User', 'Teacher User', 'Student User'],
        datasets: [
          {
            backgroundColor: this.customColorUserRole,
            data: this.userSummary,
          }
        ]
      };
    }
    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
          }
        }
      }
    };
  }

  getSummaryReservationsByStatus() {
    const searchForm: BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    return this.adminService.getSummaryReservationsByStatus(searchForm).toPromise();
  }

  getSummaryUserByRole() {
    const searchForm: BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    return this.adminService.getSummaryUserRole(searchForm).toPromise();
  }

  generateLineChart() {
    this.data3 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: 0.4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          tension: 0.4
        }
      ]
    };

    this.option3 = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {}
        }
      },
      scales: {
        x: {
          ticks: {},
          grid: {
            drawBorder: false
          }
        },
        y: {
          ticks: {},
          grid: {
            drawBorder: false
          }
        }
      }
    };
  }

  // Get number of reservations
  getNumberOfReservations() {
    const searchForm: BaseSearchForm = {startDate: 0, endDate: 922337203685477}
    return this.adminService.getSummaryReservationsByStatus(searchForm).subscribe({
      next: (data) => {
        this.totalReservation = data.accepted + data.processing + data.rejected;
        this.unprocessedReservation = data.processing;
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  getNumberOfUsers() {
    const searchForm: BaseSearchForm = {startDate: 0, endDate: 922337203685477}
    return this.adminService.getSummaryUserRole(searchForm).subscribe({
      next: (data) => {
        this.totalUser = data.admin_role + data.student_role + data.teacher_role;
      },
      error: (err) => {
        console.log(err)
      },
    });
  }
  getNumberOfAcceptedReservations() {
    const searchForm: BaseSearchForm = {startDate: 0, endDate: 922337203685477}
    return this.adminService.getSummaryReservationsByStatus(searchForm).subscribe({
      next: (data) => {
        this.acceptedReservation = data.accepted;
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  getNewUserThisMonth() {
    const now = new Date();

    // Get the first day of the month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    // Get the last day of the month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).getTime();

    const searchForm: BaseSearchForm = {startDate: startOfMonth, endDate: endOfMonth}
    return this.adminService.getSummaryUserRole(searchForm).subscribe({
      next: (data) => {
        this.newUserThisMonth = data.admin_role + data.student_role + data.teacher_role
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  getNewReservationToday() {
    const now = new Date();

    // Get the start of today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    // Get the end of today
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const searchForm: BaseSearchForm = {startDate: startOfDay, endDate: endOfDay}
    return this.adminService.getSummaryReservationsByStatus(searchForm).subscribe({
      next: (data) => {
        this.totalReservationToday = data.processing + data.accepted + data.rejected
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  getUnprocessReservationToday() {
    const now = new Date();

    // Get the start of today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    // Get the end of today
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const searchForm: BaseSearchForm = {startDate: startOfDay, endDate: endOfDay}
    return this.adminService.getSummaryReservationsByStatus(searchForm).subscribe({
      next: (data) => {
        this.unprocessReservationToday = data.processing;
      },
      error: (err) => {
        console.log(err)
      },
    });
  }
  getAcceptedReservationToday() {
    const now = new Date();

    // Get the start of today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    // Get the end of today
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const searchForm: BaseSearchForm = {startDate: startOfDay, endDate: endOfDay}
    return this.adminService.getSummaryReservationsByStatus(searchForm).subscribe({
      next: (data) => {
        this.acceptedReservationToday = data.accepted;
      },
      error: (err) => {
        console.log(err)
      },
    });
  }


}
