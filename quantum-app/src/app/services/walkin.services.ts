import { Subject } from "rxjs";
import { WalkinModel } from "../models/walkin.model";
import { JobRoleModel } from "../models/job-role.model";
import { walkinTimeSlotModel } from "../models/walkin-timeslot.model";
import { WalkinInstructionModel } from "../models/walkin-instruction.model";

export class WalkinServices {
    walkinEmitter = new Subject<WalkinModel[]>();
    private walkinList: WalkinModel[] = [
        new WalkinModel(1, 'Walk In for Designer Job Role', "10-Jul-2021 to 11-Jul-2021", "Mumbai", [new JobRoleModel(1, "Instructional Designer", false)], true, "Expires in 5 days", false, "", [new walkinTimeSlotModel(2, 1, "9:00 AM to 11:00 AM"), new walkinTimeSlotModel(3, 1, "12:00 AM to 02:00 PM")],
            new WalkinInstructionModel(1, ["Candidates are requested to log in half an hour prior to the exam start time as they would need to capture their image using a web camera. By taking this test, you are permitting the examination system to capture your video for invigilation purposes.", " Candidates would not be able to appear for the exam if the web camera attached to their system is not functional. "]
                ,
                {
                    processInstructionList: [" Candidates would not be able to appear for the exam if the web camera attached to their system is not functional. "],
                    rounds: [],
                }
            )
        ),
        // - Generate highly interactive and innovative instructional strategies for e-learning solutions - Develop course structure and learning specifications addressing the requirements of the target audience - Construct appropriate testing strategies to ensure learners' understanding and performance - Address usability issues - Keep abreast of new trends in e-learning - Ensure that the instructional strategies are as per global standards - Prepare instructional design checklists and guidelines - Check for quality assurance
        new WalkinModel(2, 'Walk In for Software Job Role', "10-Jul-2021 to 11-Jul-2021", "Mumbai", [new JobRoleModel(1, "Instructional Designer", false, 'Rs. 5,00,000 lpa',
            [" Generate highly interactive and innovative instructional strategies for e-learning solutions.", "Develop course structure and learning specifications addressing the requirements of the target audience.", "Ensure that the instructional strategies are as per global standards"]
            , [" Generate highly interactive and innovative instructional strategies for e-learning solutions.", "Develop course structure and learning specifications addressing the requirements of the target audience.", "Ensure that the instructional strategies are as per global standards"]
        ), new JobRoleModel(1, "Software Engineer", false, 'Rs. 7,00,000 lpa',
            [" Generate highly interactive and innovative instructional strategies for e-learning solutions.", "Develop course structure and learning specifications addressing the requirements of the target audience.", "Ensure that the instructional strategies are as per global standards"]
            , [" Generate highly interactive and innovative instructional strategies for e-learning solutions.", "Develop course structure and learning specifications addressing the requirements of the target audience.", "Ensure that the instructional strategies are as per global standards"]
        ),], true, "Expires in 5 days", false, "", [new walkinTimeSlotModel(2, 1, "9:00 AM to 11:00 AM")],
            new WalkinInstructionModel(1, ["Candidates are requested to log in half an hour prior to the exam start time as they would need to capture their image using a web camera. By taking this test, you are permitting the examination system to capture your video for invigilation purposes.", "Candidates would not be able to appear for the exam if the web camera attached to their system is not functional. "]
                ,
                {
                    processInstructionList: ["Every round is an elimination round.Candidates need to clear all rounds to get selected."],
                    rounds: [
                        {
                            roundNo: "I",
                            roundDate: "4th August, 2018",
                            roundTitle: " Aptitude Test: 25 Questions",

                        },
                        {
                            roundNo: "II",
                            roundDate: "4th August, 2018",
                            roundTitle: "Interview",

                        }
                    ],
                }
            )
        ),
    ];

    constructor() {

    }
    getwalkinList() {
        return this.walkinList.slice();
    }

    getwalkinObject(id: number) {
        const walkinObj = this.walkinList.find(
            (item) => {
                return item.id === id;
            }
        );
        return walkinObj;
    }



}