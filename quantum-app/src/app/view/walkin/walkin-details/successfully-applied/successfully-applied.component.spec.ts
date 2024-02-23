import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullyAppliedComponent } from './successfully-applied.component';

describe('SuccessfullyAppliedComponent', () => {
  let component: SuccessfullyAppliedComponent;
  let fixture: ComponentFixture<SuccessfullyAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullyAppliedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfullyAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
