import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { walkinTimeSlotModel } from 'src/app/models/walkin-timeslot.model';
import { WalkinModel } from 'src/app/models/walkin.model';
import { AuthService } from 'src/app/services/auth.service';
import { WalkinServices } from 'src/app/services/walkin.services';

@Component({
  selector: 'app-successfully-applied',
  templateUrl: './successfully-applied.component.html',
  styleUrls: ['./successfully-applied.component.scss']
})
export class SuccessfullyAppliedComponent implements OnInit {
  walkinObject: WalkinModel;
  selectedTimeSlot: string;
  constructor(private route: ActivatedRoute, private authSerivce: AuthService,
    private router: Router, private walkinService: WalkinServices) {
    // router.events handle this in constructor - not in oninit
    this.router.events
      .subscribe(() => {
        const navigation = this.router.getCurrentNavigation();
        var walkinId: number = navigation!.extras.state ? navigation!.extras.state['walkinId'] : 0;
        var selectedTimeslotId: number = navigation!.extras.state ? navigation!.extras.state['selectedTimeslotId'] : 0;

        this.walkinObject = this.walkinService.getwalkinObjectById(walkinId) as WalkinModel;
        var timeslot = this.walkinService.getTimeSoltObjInwalkinObject(this.walkinObject, selectedTimeslotId);
        this.selectedTimeSlot = timeslot?.timeSlot!;
        // getTimeSoltObjInwalkinObject
        console.log("hey");
        console.log(this.walkinObject);
      });
  }

  ngOnInit(): void {

    // this.route.params
    // .subscribe(
    //   (params: Params) => {
    //     this.walkinObject = this.walkinService.getwalkinObjectById(+params['id']) as WalkinModel;
    //     console.log("hey");
    //     console.log(this.walkinObject);

    //     if (!this.walkinObject) {
    //       this.router.navigate(['/']);
    //     }
    //   }
    // );
  }

}
