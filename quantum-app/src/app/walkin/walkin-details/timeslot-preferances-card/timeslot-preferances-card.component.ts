import { Component, Input, OnInit } from '@angular/core';
import { WalkinModel } from 'src/app/models/walkin.model';

@Component({
  selector: 'app-timeslot-preferances-card',
  templateUrl: './timeslot-preferances-card.component.html',
  styleUrls: ['./timeslot-preferances-card.component.scss']
})
export class TimeslotPreferancesCardComponent implements OnInit {
  @Input() walkinObject: WalkinModel;
  constructor() { }

  ngOnInit(): void {
  }

}
