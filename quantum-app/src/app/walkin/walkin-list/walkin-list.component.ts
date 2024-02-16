import { Component, OnInit } from '@angular/core';
import { WalkinModel } from '../../models/walkin.model';
import { WalkinServices } from '../../services/walkin.services';

@Component({
  selector: 'app-walkin-list',
  templateUrl: './walkin-list.component.html',
  styleUrls: ['./walkin-list.component.scss']
})
export class WalkinListComponent implements OnInit {
  walkinList: WalkinModel[] = [];
  constructor(private walkinService: WalkinServices) { }

  ngOnInit(): void {
    this.walkinList = this.walkinService.getwalkinList();

  }

}
