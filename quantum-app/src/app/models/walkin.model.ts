import { JobRoleModel } from "./job-role.model";
import { WalkinInstructionModel } from "./walkin-instruction.model";
import { walkinTimeSlotModel } from "./walkin-timeslot.model";


export class WalkinModel {
    constructor(public id: number, public title: string, public date: string, public location: string,
        public jobRoleList: JobRoleModel[], public isexpring: boolean, public expiredTitle: string,
        public isNote: boolean, public note: string, public walkinTimeslotList: walkinTimeSlotModel[], public walkinInstruction: WalkinInstructionModel) {
    }
}
