import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
@Injectable()
export class AuthService {
    loggedIn = true;
    redirectUrl: string;

    async isAuthenticated(): Promise<boolean> {
        return await new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 400);
            }
        );
    }

    login() {
        this.loggedIn = true;


    }

    logout() {
        this.loggedIn = false;
    }
}
