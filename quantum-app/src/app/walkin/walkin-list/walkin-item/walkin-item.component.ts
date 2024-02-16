import { Component, Input, OnInit } from '@angular/core';
import { WalkinModel } from '../../../models/walkin.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-walkin-item',
  templateUrl: './walkin-item.component.html',
  styleUrls: ['./walkin-item.component.scss']
})
export class WalkinItemComponent implements OnInit {
  @Input() walkinObject: WalkinModel;
  @Input() id: number;

  constructor(private route: ActivatedRoute, private authSerivce: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }
  onTapViewMoreDetails() {
    //do whatever i need
    // queryParamsHandling: 'preserve'
    this.router.navigate([this.walkinObject.id.toString(), this.walkinObject.title
    ], { relativeTo: this.route, queryParams: { allow: false }, fragment: "loading" });
    // const m = this.router.url + '/' + this.walkinObject.id.toString() + '/' + this.walkinObject.title
    // console.log(m);
    // this.authSerivce.redirectUrl = m;



  }

}
