import { Component, OnInit } from '@angular/core';
import { WalkinModel } from '../models/walkin.model';
import { WalkinServices } from '../services/walkin.services';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-walkin',
  templateUrl: './walkin.component.html',
  styleUrls: ['./walkin.component.scss']
})
export class WalkinComponent implements OnInit {

  constructor(public authService: AuthService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  }
  onLogout() {
    this.authService.logout();
    //after successfully logout
    // here we need to mnetion where to go -- login screen
    this.router.navigate(['login']);
  }
}
