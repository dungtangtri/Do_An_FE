import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-approve-reservations',
  templateUrl: './approve-reservations.component.html',
  styleUrls: ['./approve-reservations.component.css']
})
export class ApproveReservationsComponent implements OnInit{
  ngOnInit() {

  }
  isVisible = false;

  handleCancel(){
    this.isVisible = false;
  }

}
