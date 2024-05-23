import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceReservationComponent } from './place-reservation.component';

describe('PlaceReservationComponent', () => {
  let component: PlaceReservationComponent;
  let fixture: ComponentFixture<PlaceReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceReservationComponent]
    });
    fixture = TestBed.createComponent(PlaceReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
