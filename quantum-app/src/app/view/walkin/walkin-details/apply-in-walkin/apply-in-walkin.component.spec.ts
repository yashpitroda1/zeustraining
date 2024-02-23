import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyInWalkinComponent } from './apply-in-walkin.component';

describe('ApplyInWalkinComponent', () => {
  let component: ApplyInWalkinComponent;
  let fixture: ComponentFixture<ApplyInWalkinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyInWalkinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyInWalkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
