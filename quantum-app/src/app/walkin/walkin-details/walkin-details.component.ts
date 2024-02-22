import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { WalkinModel } from 'src/app/models/walkin.model';
import { WalkinServices } from 'src/app/services/walkin.services';

@Component({
  selector: 'app-walkin-details',
  templateUrl: './walkin-details.component.html',
  styleUrls: ['./walkin-details.component.scss']
})
export class WalkinDetailsComponent implements OnInit {
  walkinObject: WalkinModel;
  panelOpenState: boolean = false;

  constructor
    (
      private walinService: WalkinServices,
      private route: ActivatedRoute,
      private router: Router
    ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {

          this.walkinObject = this.walinService.getwalkinObjectById(+params['id']) as WalkinModel;

          if (!this.walkinObject) {
            this.router.navigate(['/']);
          }
        }
      );
  }

  onTapOnWalkinApplyHandler(dataTemp: { data: string }) {
    console.log(dataTemp);
    console.log("perent - applied");
    this.router.navigateByUrl('/walkin/successfullyapplied');


  }


}
