import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotPreferancesCardComponent } from './timeslot-preferances-card.component';

describe('TimeslotPreferancesCardComponent', () => {
  let component: TimeslotPreferancesCardComponent;
  let fixture: ComponentFixture<TimeslotPreferancesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotPreferancesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeslotPreferancesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
