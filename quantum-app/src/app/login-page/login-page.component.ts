import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  redirectURL: any;
  constructor(public authService: AuthService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
  async onLogin() {
    await this.authService.login(); // return status about login is sucess full or not

    //after successfully login
    // here we need to mnetion where to go
    this.router.navigateByUrl(this.authService.redirectUrl);

  }

  onLogout() {
    this.authService.logout();
    //after successfully login
    // here we need to mnetion where to go -- login screen
  }
}
