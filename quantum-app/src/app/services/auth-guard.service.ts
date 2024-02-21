import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  UrlTree
} from '@angular/router';

import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return this.authService.isAuthenticated()
//       .then(
//         (authenticated: boolean) => {
//           if (authenticated) {
//             return true;
//           } else {
//             this.router.navigate(['/']);
//           }
//         }
//       );
//   }

//   canActivateChild(route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return this.canActivate(route, state);
//   }
// }
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authservice: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {

    // set state url
    this.authservice.redirectUrl = state.url;
    //validate user
    return this.authservice.usersub.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {

    return this.canActivate(route, state);
  }
}