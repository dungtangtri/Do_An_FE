import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CONSTANTS} from "../board-user/utils/CONSTANTS";
import {FormGroup} from "@angular/forms";
import {Util} from "../util/util.class";
import {AdminService} from "../admin-get-all-users-reservations/service/admin.service";
import {SummaryReservationsByStatusDto} from "./models/summary-reservations-by-status-dto";
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
  chartOptions: any;

  constructor(private adminService: AdminService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.formSearch = Util.createFormGroup(CONSTANTS.SEARCH_FORM_CONTROL_NAME)
  }

  statusSummary: any;

  ngOnInit(): void {
    this.generatePieChart1();
  }

  resetForm() {
    this.formSearch.reset();
    this.generatePieChart1();
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

  getSummaryReservationsByStatus() {
    const searchForm: BaseSearchForm = Util.getDataFormSearch(this.formSearch)
    return this.adminService.getSummaryReservationsByStatus(searchForm).toPromise();
  }


}
