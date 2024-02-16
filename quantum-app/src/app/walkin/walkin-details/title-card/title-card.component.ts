import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { WalkinModel } from 'src/app/models/walkin.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.scss']
})
export class TitleCardComponent implements OnInit {
  panelOpenState: boolean = false;

  @Input() walkinObject: WalkinModel;
  @Input() id: number;
  @Output() applyEventEmitter = new EventEmitter<{ data: string }>;
  constructor(private route: ActivatedRoute, private authSerivce: AuthService,
    private router: Router) { }
  ngOnInit(): void {

  }
  onTapOnApply() {
    this.applyEventEmitter.emit({ data: "tapped form child" });
  }
}
