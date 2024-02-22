// class RoundModel {
//     constructor(public roundNo: string, public roundDate: string, public roundTitle: string) { }
// }

// class ProcessDetailsModel {
//     constructor(public rounds: RoundModel[], public processInstruction: string[]) { }
// }

// class WalkinInstructionModel {
//     static FromJson(walkinInstruction: any): WalkinInstructionModel {
//         throw new Error("Method not implemented.");
//     }
//     constructor(
//         public generalInstructions: string[],
//         public examInstructions: string[],
//         public systemRequirements: string[],
//         public processDetails: ProcessDetailsModel
//         //  public generalInstruction?: string[],
//     ) { }
// }

export class WalkinInstructionModel {
    constructor(
        public generalInstructions: string[],
        public examInstructions: string[],
        public systemRequirements: string[],
        public processDetails: ProcessDetailsModel
    ) { }

    static fromJson(json: any): WalkinInstructionModel {
        const generalInstructions: string[] = json.generalInstructions || [];
        const examInstructions: string[] = json.examInstructions || [];
        const systemRequirements: string[] = json.systemRequirements || [];
        const processDetails: ProcessDetailsModel = ProcessDetailsModel.fromJson(json.processDetails || {});

        return new WalkinInstructionModel(generalInstructions, examInstructions, systemRequirements, processDetails);
    }
}

class ProcessDetailsModel {
    constructor(public rounds: RoundModel[], public processInstruction: string[]) { }

    static fromJson(json: any): ProcessDetailsModel {
        const rounds: RoundModel[] = (json.rounds || []).map((roundJson: any) => {
            return new RoundModel(roundJson.roundNo, roundJson.roundDate, roundJson.roundTitle);
        });
        const processInstruction: string[] = json.processInstruction || [];

        return new ProcessDetailsModel(rounds, processInstruction);
    }
}

class RoundModel {
    constructor(public roundNo: string, public roundDate: string, public roundTitle: string) { }

    static fromJson(json: any): RoundModel {
        return new RoundModel(json.roundNo || "", json.roundDate || "", json.roundTitle || "");
    }
}

// Example usage:
// const jsonData = {
//     generalInstructions: ["Follow the instructions carefully.", "Arrive on time."],
//     examInstructions: ["Bring a pen and identification."],
//     systemRequirements: ["Bring your laptop."],
//     processDetails: {
//         rounds: [
//             { roundNo: "1", roundDate: "2024-02-22", roundTitle: "Technical Interview" },
//             { roundNo: "2", roundDate: "2024-02-23", roundTitle: "HR Interview" }
//         ],
//         processInstruction: ["Be prepared for technical questions."]
//     }
// };

// const walkinInstructionModel = WalkinInstructionModel.fromJson(jsonData);

