import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'quantum-app';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoLogin();
  }
  ngDoCheck() {

  }
}
