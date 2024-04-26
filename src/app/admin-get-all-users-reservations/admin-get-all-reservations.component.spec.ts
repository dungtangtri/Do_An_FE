import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGetAllReservationsComponent } from './admin-get-all-reservations.component';

describe('BoardAdminComponent', () => {
  let component: AdminGetAllReservationsComponent;
  let fixture: ComponentFixture<AdminGetAllReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGetAllReservationsComponent]
    });
    fixture = TestBed.createComponent(AdminGetAllReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
