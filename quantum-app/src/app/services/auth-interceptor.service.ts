import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private route: ActivatedRoute, private authService: AuthService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.usersub.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    console.log("intercept - user is not exist")
                    return next.handle(req);
                }
                if (!user.token) {
                    console.log("intercept - no valid token exist")
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    // params: new HttpParams().set('auth', user.token)
                    setHeaders: {
                        'Authorization': user.token ? "bearer " + user.token : "",
                    }
                });
                return next.handle(modifiedReq);
            })
        );
    }
}
