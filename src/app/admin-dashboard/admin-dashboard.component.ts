import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CONSTANTS} from "../board-user/utils/CONSTANTS";
import {FormGroup} from "@angular/forms";
import {Util} from "../util/util.class";
import {AdminService} from "../admin-get-all-users-reservations/service/admin.service";
import {BaseSearchForm} from "../shared/BaseSearchForm";
import {
  GetNumberOfReservationsByYearSearchForm
} from "../admin-get-all-users-reservations/models/get-number-of-reservations-by-year-search-form";

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
  today: any;
  data3: any;
  chartOptions: any;
  totalReservation: any;
  totalReservationToday: any;
  unprocessedReservation: any;
  totalUser: any;
  selectedYear: any;
  newUserThisMonth: any;
  unprocessReservationToday: any;
  acceptedReservationToday: any;
  acceptedReservation: any;
  isValidDate = true;
  years: any = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  lineChartData: any;
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
    this.today = new Date();
    this.getDataToday();
    this.getDataNumberOfReservations();
    this.getDataNumberOfAcceptedReservations();
    this.getDataNewUserThisMonth();
    this.getDataNumberOfUsers();
    this.getDataNewUserThisMonth();
    this.generatePieChart1();
    this.generatePieChart2();
    this.selectedYear = new Date().getFullYear();
    this.generateLineChart();
  }

  onSearch() {
    this.generatePieChart1();
    this.generatePieChart2();
  }
  resetForm() {
    this.formSearch.reset();
    this.isValidDate = true;
    this.generatePieChart1();
    this.generatePieChart2();
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


  async getDataNumberOfReservations() {
    const data = await this.getNumberOfReservations();
    if (data) {
      this.totalReservation = data.accepted + data.processing + data.rejected;
      this.unprocessedReservation = data.processing;
    }
  }

  // Get number of reservations
  getNumberOfReservations() {
    const searchForm: BaseSearchForm = {startDate: 0, endDate: 922337203685477}
    return this.adminService.getSummaryReservationsByStatus(searchForm).toPromise();
  }

  async getDataNumberOfUsers() {
    const data = await this.getNumberOfUsers();
    if (data) {
      this.totalUser = data.admin_role + data.student_role + data.teacher_role;
    }
  }
  getNumberOfUsers() {
    const searchForm: BaseSearchForm = {startDate: 0, endDate: 922337203685477}
    return this.adminService.getSummaryUserRole(searchForm).toPromise();
  }

  async getDataNumberOfAcceptedReservations() {
    const data = await this.getNumberOfAcceptedReservations();
    if (data) {
      this.acceptedReservation = data.accepted;
    }
  }
  getNumberOfAcceptedReservations() {
    const searchForm: BaseSearchForm = {startDate: 0, endDate: 922337203685477}
    return this.adminService.getSummaryReservationsByStatus(searchForm).toPromise();
  }

  async getDataNewUserThisMonth() {
    const data = await this.getNewUserThisMonth();
    if (data) {
      this.newUserThisMonth = data.admin_role + data.student_role + data.teacher_role
    }
  }

  getNewUserThisMonth() {
    const now = new Date();

    // Get the first day of the month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    // Get the last day of the month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).getTime();

    const searchForm: BaseSearchForm = {startDate: startOfMonth, endDate: endOfMonth}
    return this.adminService.getSummaryUserRole(searchForm).toPromise();
  }

  async getDataToday() {
    const data = await this.getNewReservationToday();
    if (data) {
      this.totalReservationToday = data.processing + data.accepted + data.rejected;
      if (this.totalReservationToday != 0) {
        this.unprocessReservationToday = data.processing;
        this.acceptedReservationToday = data.accepted;
      } else {
        this.unprocessReservationToday = 0;
        this.acceptedReservationToday = 0;
      }

    }
  }
  getNewReservationToday() {
    const now = new Date();

    // Get the start of today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    // Get the end of today
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const searchForm: BaseSearchForm = {startDate: startOfDay, endDate: endOfDay}
    return this.adminService.getSummaryReservationsByStatus(searchForm).toPromise();
  }

  generateLineChart() {
    console.log(this.selectedYear);
    const searchForm: GetNumberOfReservationsByYearSearchForm = {year: this.selectedYear};
    return this.adminService.getNumberOfReservationByYear(searchForm).subscribe({
      next: (data) => {
        const totalReservationsPerMonth = Array(12).fill(0);
        data.forEach(item => {
          const [month, year] = item.reservation_date.split('-');
          const monthIndex = parseInt(month, 10) - 1; // Convert month to zero-based index
          totalReservationsPerMonth[monthIndex] = item.total_reservations;
        });
        this.lineChartData = totalReservationsPerMonth;
        this.data3 = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Number of Reservations',
              data: this.lineChartData,
              fill: false,
              tension: 0.4
            },
          ]
        };
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully get data from the server',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: "Error retrieving data from the server",
        });
      },
    })
  }
  validateTime() {
    if (this.formSearch.get('startDate')?.value < this.formSearch.get('endDate')?.value) {
      this.isValidDate = true;
    } else if((this.formSearch.get('startDate')?.value > this.formSearch.get('endDate')?.value) && this.formSearch.get('endDate')?.value != '' ) {
      this.isValidDate = false;
    }
  }
}
