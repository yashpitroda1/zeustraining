import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authSerivce: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }
  onTapOnHeaderLogo() {
    this.router.navigate(['/']);
  }
}
