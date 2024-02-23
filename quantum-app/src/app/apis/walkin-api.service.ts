import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { WalkinServices } from "../services/walkin.services";
import { Injectable } from "@angular/core";
import { catchError, exhaustMap, take, tap, throwError } from "rxjs";
import { WalkinModel } from "../models/walkin.model";
import { UtilityHelper } from "../helper/utility.helper";

@Injectable()
export class WalkinApiService {
    constructor(
        private http: HttpClient,
        private walkinServices: WalkinServices,
        private authService: AuthService
    ) { }

    fetchWalkins() {
        return this.http.get<IWalkinData[]>(UtilityHelper.baseUrl + "api/Walkin/DataList", UtilityHelper.httpOptions).pipe(
            catchError(this.handleError),
            tap(resData => {
                var tempWalkinList: WalkinModel[] = [];
                resData.map(resItem => {
                    tempWalkinList.push(WalkinModel.fromJson(resItem))
                });
                this.walkinServices.setWalkinList(tempWalkinList);
            })
        )
    }

    applyInWalkin(walkinId: number, selectedTimeslotId: number, walkinJobRoleId: number[], dateCreated: Date, dateUpdated: Date | null) {
        return this.authService.usersub.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.post<{
                    status: string,
                    userApplicationId: number,
                    selectedTimeslotId: number,
                    userId: number,
                    walkinId: number
                }>(UtilityHelper.baseUrl + "api/WalkinApply", {
                    "userId": user?.id,
                    "walkinId": walkinId,
                    "selectedTimeslotId": selectedTimeslotId,
                    "walkinJobRoleId": walkinJobRoleId,
                    "dateCreated": dateCreated,
                    "dateUpdated": null

                }, UtilityHelper.httpOptions).pipe(
                    catchError(this.handleError),
                    tap(resData => {
                        console.log(resData);
                    })
                )

            })
        );

    }
    // fetchWalkins error occor -> catchError -> handleError -> WalkinListComponent.ts -> ngonit -> errorMassage
    private handleError(errorRes: HttpErrorResponse) {
        console.log("---------------------");
        console.log(errorRes.status);
        console.log("---------------------");
        let errorMessage = 'An unknown error occurred!';
        if (errorRes.status == 401) {
            errorMessage = "Unauthorized"
        }
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


export interface IWalkinData {
    id: number;
    walkinTitle: string;
    walkinNotes: string | null;
    walkinStartingDate: string;
    walkinEndingDate: string;
    walkinAddress: {
        phone: string;
        city: string;
        address: string;
        pinCode: string;
        landmark: string;
        companyName: string;
    };
    walkinCity: string;
    walkinThingsToRemember: string[];
    walkinInstruction: {
        generalInstructions: string[];
        examInstructions: string[];
        systemRequirements: string[];
        processDetails: {
            rounds: {
                roundNo: string;
                roundDate: string;
                roundTitle: string;
            }[];
            processInstruction: string[];
        };
    };
    walkinJobRole: {
        walkinJobRoleId: number;
        enumJobRoleId: number;
        roleName: string;
        grossCompensationPackage: string;
        roleDescription: string[];
        requirements: string[];
    }[];
    walkinTimeSlot: {
        walkinTimeSlotId: number;
        timeSlot: string;
    }[];
}

