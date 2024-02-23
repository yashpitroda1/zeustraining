import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinListComponent } from './walkin-list.component';

describe('WalkinListComponent', () => {
  let component: WalkinListComponent;
  let fixture: ComponentFixture<WalkinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkinListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
