import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  redirectURL: any;
  isloading: boolean = false;
  error?: string;
  constructor(public authService: AuthService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    console.log(form.value);

    const userEmail = form.value.userEmail;
    const password = form.value.password;
    const isRememberMe = form.value.isRememberMe ? true : false;
    this.isloading = true;
    this.authService.login(userEmail, password, isRememberMe, "user").subscribe(
      resData => {

        console.log(resData);
        this.isloading = false;
        form.reset();
        this.router.navigateByUrl(this.authService.redirectUrl);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isloading = false;
      });


  }

  // async onLogin() {
  //   await this.authService.login(); // return status about login is sucess full or not

  //   //after successfully login
  //   // here we need to mnetion where to go
  //   this.router.navigateByUrl(this.authService.redirectUrl);

  // }

  // onLogout() {
  //   this.authService.logout();
  //   //after successfully login
  //   // here we need to mnetion where to go -- login screen
  // }
}
