import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { from } from 'rxjs';
import { WalkinApiService } from 'src/app/apis/walkin-api.service';
import { WalkinModel } from 'src/app/models/walkin.model';
import { WalkinServices } from 'src/app/services/walkin.services';

@Component({
  selector: 'app-apply-in-walkin',
  templateUrl: './apply-in-walkin.component.html',
  styleUrls: ['./apply-in-walkin.component.scss']
})
export class ApplyInWalkinComponent implements OnInit {

  walkinObject: WalkinModel;
  isPrerequsitesOpenState: boolean = false;
  isloading: boolean;
  constructor(
    private walinService: WalkinServices, private walkinApiService: WalkinApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  applyInWalkin = this.formBuilder.group(
    {
      timeSlotId: ["", Validators.required],
      jobroleList: this.formBuilder.array([], Validators.required),
      resume: new FormControl(),
    }
  )
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
  onTapOnWalkinApplyHandler() {
    if (this.applyInWalkin.controls.jobroleList.controls.length == 0
      || this.applyInWalkin.controls.timeSlotId.value == ""
    ) {
      console.log("empty")
      return;
    }
    this.isloading = true;

    console.log(+this.applyInWalkin.get("timeSlotId")!.value!)
    console.log(this.applyInWalkin.get("jobroleList")!.value)
    var userid =
      this.walkinApiService.applyInWalkin(this.walkinObject.id, +this.applyInWalkin.get("timeSlotId")!.value!, this.applyInWalkin.get("jobroleList")!.value! as number[], new Date(), null).subscribe(
        resData => {
          this.isloading = false;
          console.log(resData);
          if (resData.status == "success") {
            // navigate
            this.router.navigate(['successfullyapplied'], {
              relativeTo: this.route, state: { walkinId: this.walkinObject.id, selectedTimeslotId: resData.selectedTimeslotId }
            },);
          }
        },
        errorMessage => {
          this.isloading = false;
          console.log("errorMessage");
          console.log(errorMessage as string);

          if (errorMessage === "Unauthorized") {//401
            this.router.navigateByUrl("/login");
          }
        }
      )


  }
  onPreferedRoleChange(walkinJobRoleId: Number, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      this.applyInWalkin.controls.jobroleList.push(new FormControl(walkinJobRoleId));
    } else {
      let index = this.applyInWalkin.controls.jobroleList.controls.findIndex((x) => x.value == walkinJobRoleId);
      this.applyInWalkin.controls.jobroleList.removeAt(index);
    }
  }
}
