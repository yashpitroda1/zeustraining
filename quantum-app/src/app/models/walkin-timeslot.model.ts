// export class walkinTimeSlotModel {

//     constructor(
//         public walkinTimeSlotId: number,
//         public timeSlot: string
//     ) {
//     }
// }
export class walkinTimeSlotModel {
    constructor(
        public walkinTimeSlotId: number,
        public timeSlot: string
    ) {
    }

    static fromJson(json: any): walkinTimeSlotModel {
        return new walkinTimeSlotModel(json.walkinTimeSlotId, json.timeSlot);
    }
}
