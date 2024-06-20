import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClassroomCalendarInAWeekComponent } from './get-classroom-calendar-in-a-week.component';

describe('GetClassroomCalendarInAWeekComponent', () => {
  let component: GetClassroomCalendarInAWeekComponent;
  let fixture: ComponentFixture<GetClassroomCalendarInAWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetClassroomCalendarInAWeekComponent]
    });
    fixture = TestBed.createComponent(GetClassroomCalendarInAWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
