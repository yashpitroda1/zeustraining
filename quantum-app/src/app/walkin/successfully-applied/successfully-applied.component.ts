import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-successfully-applied',
  templateUrl: './successfully-applied.component.html',
  styleUrls: ['./successfully-applied.component.scss']
})
export class SuccessfullyAppliedComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authSerivce: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    console.log(this.router.url);
  }

}
