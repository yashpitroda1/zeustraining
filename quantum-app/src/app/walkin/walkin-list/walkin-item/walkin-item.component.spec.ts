import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinItemComponent } from './walkin-item.component';

describe('WalkinItemComponent', () => {
  let component: WalkinItemComponent;
  let fixture: ComponentFixture<WalkinItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkinItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkinItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
