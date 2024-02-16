interface x {
    roundNo: string,
    roundDate: string,
    roundTitle: string
};
interface iProcessDetails {
    processInstructionList: string[];
    rounds: x[];
};
export class WalkinInstructionModel {
    constructor(public walkinId: number, public generalInstruction?: string[],
        public processDetails?: iProcessDetails, public examInstruction?: string[], public systemRequirement?: string[]) {
    }
}
