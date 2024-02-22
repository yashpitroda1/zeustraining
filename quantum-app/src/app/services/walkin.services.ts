import { Subject } from "rxjs";
import { WalkinModel } from "../models/walkin.model";

import { walkinTimeSlotModel } from "../models/walkin-timeslot.model";


export class WalkinServices {
    walkinListChangedEventEmitter = new Subject<WalkinModel[]>();
    private _walkinList: WalkinModel[] = [];
    constructor() {
    }

    getWalkinList() {
        return this._walkinList.slice();

    }

    getwalkinObjectById(id: number) {
        const walkinObj = this._walkinList.find(
            (item) => {
                return item.id === id;
            }
        );
        return walkinObj;
    }
    getwalkinObjectByIndex(index: number) {
        return this._walkinList[index];
    }

    setWalkinList(walkinList: WalkinModel[]) {
        this._walkinList = walkinList;
        this.walkinListChangedEventEmitter.next(this._walkinList.slice());
    }
}