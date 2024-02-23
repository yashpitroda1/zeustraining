import { Component, OnInit } from '@angular/core';
import { WalkinModel } from '../../../models/walkin.model';
import { WalkinServices } from '../../../services/walkin.services';
import { Subscription } from 'rxjs';
import { WalkinApiService } from 'src/app/apis/walkin-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-walkin-list',
  templateUrl: './walkin-list.component.html',
  styleUrls: ['./walkin-list.component.scss']
})
export class WalkinListComponent implements OnInit {
  walkinList: WalkinModel[] = [];
  isloading: boolean = false;
  walkinListChangedSubscriber: Subscription;
  constructor(private walkinService: WalkinServices, private walkinApiService: WalkinApiService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.isloading = true;
    this.walkinApiService.fetchWalkins().subscribe(
      resData => {
        this.isloading = false;
        console.log("at component");
        console.log(resData);
      },
      errorMessage => {
        this.isloading = false;
        console.log("errorMessage");
        console.log(errorMessage as string);

        if (errorMessage === "Unauthorized") {//401
          this.router.navigateByUrl("/login");
        }
      })
      ;
    this.walkinListChangedSubscriber = this.walkinService.walkinListChangedEventEmitter
      .subscribe(
        (newWalkinList: WalkinModel[]) => {
          this.walkinList = newWalkinList;
        }
      );
    this.walkinList = this.walkinService.getWalkinList();
  }
  ngOnDestroy() {
    this.walkinListChangedSubscriber.unsubscribe();
  }

}
