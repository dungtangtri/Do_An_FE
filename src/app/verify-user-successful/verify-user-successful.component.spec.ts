import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserSuccessfulComponent } from './verify-user-successful.component';

describe('VerifyUserSuccessfulComponent', () => {
  let component: VerifyUserSuccessfulComponent;
  let fixture: ComponentFixture<VerifyUserSuccessfulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyUserSuccessfulComponent]
    });
    fixture = TestBed.createComponent(VerifyUserSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
