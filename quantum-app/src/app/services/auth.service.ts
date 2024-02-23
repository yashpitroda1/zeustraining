import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { UserModel } from "../models/user.model";
import { UtilityHelper } from "../helper/utility.helper";
export interface authResData {
    id: string,
    userEmail: string,
    token: string,
    tokenExpiresAt: Date,
    role: string
}
@Injectable()
export class AuthService {
    usersub = new BehaviorSubject<UserModel | undefined>(undefined); //notify to whole application
    private tokenExpirationTimer: any;
    loggedIn = false;
    redirectUrl: string = '/';

    constructor(private http: HttpClient, private router: Router) { }

    autoLogin() {
        const userData: {
            userEmail: string;
            id: number;
            _token: string;
            _tokenExpiresAt: string;
            role: string;
        } = JSON.parse(localStorage.getItem('userData')!);

        if (!userData) {
            console.log("no userDate in local - for auto login");
            return;
        }

        const loadedUserObj = new UserModel(
            userData.id,
            userData.userEmail,
            userData._token,
            new Date(userData._tokenExpiresAt),
            userData.role
        );
        console.log('loadedUserObj');
        console.log(loadedUserObj);

        if (loadedUserObj.token) {
            console.log('token - verified');
            this.usersub.next(loadedUserObj);

            const expirationDuration =
                new Date(userData._tokenExpiresAt).getTime() -
                new Date().getTime();
            console.log("expirationDuration:" + expirationDuration);
            this.autoLogout(expirationDuration);
        } else {
            // if token is expired 
            // then go to login page
        }
    }


    login(userEmail: string, password: string, isRememberMe: boolean, role: string) {

        return this.http.post<authResData>(UtilityHelper.baseUrl + "Auth/Login", {
            userEmail: userEmail,
            password: password,
            isRememberMe: isRememberMe,
            role: role
        }, UtilityHelper.httpOptions).pipe(
            catchError(this.handleError),
            tap(resData => {
                // this.router.navigate(['/']); //handle at login page ts
                this.handleAuthentication(
                    +resData.id,
                    resData.userEmail,
                    resData.token,
                    resData.tokenExpiresAt,
                    resData.role
                );
            })
        );;


    }

    logout() {
        this.usersub.next(undefined);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = undefined;
    }
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(
        id: number,
        userEmail: string,
        token: string,
        tokenExpiresAt: Date, role: string
    ) {
        const user = new UserModel(id, userEmail, token, tokenExpiresAt, role);
        this.usersub.next(user);
        localStorage.setItem("userData", JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log("error form backend");
        // console.log(errorRes);
        console.log(errorRes.error["text"]);
        console.log("---------------------");
        let errorMessage = 'An unknown error occurred!';
        // if (!errorRes.error || !errorRes.error.error) {
        //     return throwError(errorMessage);
        // }
        // switch (errorRes.error.error.message) {
        //     case 'EMAIL_EXISTS':
        //         errorMessage = 'This email exists already';
        //         break;
        //     case 'EMAIL_NOT_FOUND':
        //         errorMessage = 'This email does not exist.';
        //         break;
        //     case 'INVALID_PASSWORD':
        //         errorMessage = 'This password is not correct.';
        //         break;
        // }
        return throwError(errorMessage);
    }


}
