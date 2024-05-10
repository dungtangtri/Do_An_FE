import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGetMyReservationsComponent } from './user-get-my-reservations.component';

describe('BoardUserComponent', () => {
  let component: UserGetMyReservationsComponent;
  let fixture: ComponentFixture<UserGetMyReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGetMyReservationsComponent],
    });
    fixture = TestBed.createComponent(UserGetMyReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
