import { WalkinAddressModel } from "./walkin-address.model";
import { WalkinInstructionModel } from "./walkin-instruction.model";
import { WalkinJobRoleModel } from "./walkin-job-role.model";
import { walkinTimeSlotModel } from "./walkin-timeslot.model";


export class WalkinModel {
    constructor(
        public id: number,
        public walkinTitle: string,
        public walkinStartingDate: Date,
        public walkinEndingDate: Date,
        public walkinAddress: WalkinAddressModel,
        public walkinCity: string,
        public walkinThingsToRemember: string[],
        public walkinInstruction: WalkinInstructionModel,
        public walkinJobRole: WalkinJobRoleModel[],
        public walkinTimeSlot: walkinTimeSlotModel[],
        public walkinNotes?: string,
    ) {
    }
    // make getter of isexpring and remainning days


    // toJson function to convert WalkinModel to JSON string
    // toJson(): string {
    //     return JSON.stringify({
    //         id: this.id,
    //         walkinTitle: this.walkinTitle,
    //         walkinStartingDate: this.walkinStartingDate,
    //         walkinEndingDate: this.walkinEndingDate,
    //         walkinAddress: this.walkinAddress,
    //         walkinCity: this.walkinCity,
    //         walkinThingsToRemember: this.walkinThingsToRemember,
    //         walkinInstruction: this.walkinInstruction,
    //         walkinJobRole: this.walkinJobRole,
    //         walkinTimeSlot: this.walkinTimeSlot,
    //         walkinNotes: this.walkinNotes
    //     });
    // }

    // FromJson function to create WalkinModel from JSON string
    static fromJson(json: any): WalkinModel {
        // console.log("obj");
        // var db = JSON.stringify(json);
        // var obj: any = JSON.parse(db);
        // console.log(typeof (obj));
        // console.log("obj2");

        // Create a new instance of WalkinModel using the parsed JSON object
        return new WalkinModel(
            json.id,
            json.walkinTitle,
            new Date(json.walkinStartingDate),
            new Date(json.walkinEndingDate),
            WalkinAddressModel.fromJson(json.walkinAddress),
            json.walkinCity,
            json.walkinThingsToRemember,
            WalkinInstructionModel.fromJson(json.walkinInstruction),
            json.walkinJobRole.map((role: any) => WalkinJobRoleModel.fromJson(role)),
            json.walkinTimeSlot.map((slot: any) => walkinTimeSlotModel.fromJson(slot)),

            json.walkinNotes
        );
    }

}

