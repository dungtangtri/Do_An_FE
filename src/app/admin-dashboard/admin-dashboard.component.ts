import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CONSTANTS} from "../board-user/utils/CONSTANTS";
import {FormGroup} from "@angular/forms";
import {Util} from "../util/util.class";
import {AdminService} from "../admin-get-all-users-reservations/service/admin.service";
import {BaseSearchForm} from "../util/shared/BaseSearchForm";
import {
  GetNumberOfReservationsByYearSearchForm
} from "../admin-get-all-users-reservations/models/get-number-of-reservations-by-year-search-form";
import {GetNumberOfReservationsByReasonSearchForm} from "./models/get-number-of-reservations-by-reason-search-form";
import {StorageService} from "../auth-service/storage.service";

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
  numberOfReservationsByMonth: any;
  numberOfReservationsByReason: any;
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
  months: any = [
    {id: 1, name: 'January'},
    {id: 2, name: 'February'},
    {id: 3, name: 'March'},
    {id: 4, name: 'April'},
    {id: 5, name: 'May'},
    {id: 6, name: 'June'},
    {id: 7, name: 'July'},
    {id: 8, name: 'August'},
    {id: 9, name: 'September'},
    {id: 10, name: 'October'},
    {id: 11, name: 'November'},
    {id: 12, name: 'December'}
  ];
  userRole: any[] = [{
    id: 'ROLE_STUDENT',
    name: 'ROLE_STUDENT'
  }, {id: 'ROLE_TEACHER', name: 'ROLE_TEACHER'}];
  status: any[] = [{id: '1', name: 'ACCEPTED'}, {id: '2', name: 'REJECTED'}, {id: '0', name: 'PROCESSING'}];
  selectedMonth: any;
  selectedStatus: any;
  selectedUserRole: any;
  selectedYearReason: any;
  lineChartData: any;
  reasons: any;
  studentReasons: any = [
    'For Self/Group Study Sessions',
    'For Club or Organization Meetings',
    'For Project Work',
    'For Online Classes or Meetings',
    'For Personal Use'
  ];
  teacherReasons = [
    'Scheduled Classes',
    'Exams and Assessments',
    'Meetings and Consultations',
    'Special Events',
    'Group Activities',
  ];
  customColor = ['#ffc700', '#0fb215', '#e53131'];
  customColorUserRole = ['#6A1B9A', '#E64A19', '#00838F']
  constructor(private adminService: AdminService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private storageService: StorageService) {
    this.formSearch = Util.createFormGroup(CONSTANTS.SEARCH_FORM_CONTROL_NAME)
  }

  statusSummary: any;
  userSummary: any
  ngOnInit(): void {
    this.selectedUserRole = 'ROLE_TEACHER';
    this.today = new Date();
    this.getDataToday();
    this.getDataNumberOfReservations();
    this.getDataNumberOfAcceptedReservations();
    this.getDataNewUserThisMonth();
    this.getDataNumberOfUsers();
    this.getDataNewUserThisMonth();
    this.generatePieChart1();
    this.generatePieChart2();
    this.selectedYearReason = new Date().getFullYear();
    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = new Date().getMonth() + 1;
    this.generateLineChart();
    this.generateBarChart();
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
        this.numberOfReservationsByMonth = {
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
    const startDate = this.formSearch.get(this.SEARCH_FORM_CONTROL.START_DATE.NAME)?.value;
    const endDate = this.formSearch.get(this.SEARCH_FORM_CONTROL.END_DATE.NAME)?.value;

    if (startDate && endDate) {
      this.isValidDate = startDate < endDate;
    } else if (startDate && !endDate) {
      this.isValidDate = true; // Consider it valid if only start date is set and end date is not set
    } else {
      this.isValidDate = true; // Consider it valid if neither date is set
    }
  }


  generateBarChart() {
    if (this.selectedUserRole == 'ROLE_TEACHER') {
      this.reasons = this.teacherReasons;
    } else {
      this.reasons = this.studentReasons;
    }
    const searchForm: GetNumberOfReservationsByReasonSearchForm = {
      year: this.selectedYearReason,
      month: this.selectedMonth,
      status: this.selectedStatus,
      userRole: this.selectedUserRole
    }
    this.adminService.getNumberOfReservationByReason(searchForm).subscribe({
      next: (data) => {
        const role = this.selectedUserRole;
        const reasons = this.getReasonsByRole(role);
        const result = reasons.map(reason => {
          const matchingResponse = data.find(res => res.reservation_description === reason);
          return {
            reason,
            total_reservations: matchingResponse ? matchingResponse.total_reservations : 0
          };
        });

        this.numberOfReservationsByReason = {
          labels: reasons,
          datasets: [
            {
              label: 'Number of Reservations',
              data: result.map(item => item.total_reservations),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(199, 199, 199, 0.2)',
                'rgba(83, 102, 255, 0.2)',
                'rgba(132, 132, 132, 0.2)',
                'rgba(75, 75, 75, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(83, 102, 255, 1)',
                'rgba(132, 132, 132, 1)',
                'rgba(75, 75, 75, 1)'
              ],
              borderWidth: 1
            }
          ]
        };
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: "Error retrieving data from the server",
        });
      },
    })
    this.messageService.add({
      severity: 'success',
      summary: "Successfully retrieving data from the server",
    });
  }

  getReasonsByRole(role: string): any[] {
    if (role === 'ROLE_STUDENT') {
      return this.studentReasons;
    } else if (role === 'ROLE_TEACHER') {
      return this.teacherReasons;
    }
    return [];
  }
}
