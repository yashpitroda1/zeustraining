// export class WalkinJobRoleModel {
//     static FromJson(role: any) {
//         throw new Error("Method not implemented.");
//     }
//     constructor(
//         public walkinJobRoleId: number,
//         public enumJobRoleId: number,
//         public roleName: string,
//         public grossCompensationPackage: string,
//         public roleDescription: string[],
//         public requirements: string[],
//         public istoggle: boolean = false,
//         // public roleDescription?: string[],
//         // public requirements?: string[],
//     ) {
//     }
// }

export class WalkinJobRoleModel {


    constructor(
        public walkinJobRoleId: number,
        public enumJobRoleId: number,
        public roleName: string,
        public grossCompensationPackage: string,
        public roleDescription: string[],
        public requirements: string[],
        public istoggle: boolean = false
    ) { }
    static fromJson(json: any): WalkinJobRoleModel {
        return new WalkinJobRoleModel(
            json.walkinJobRoleId,
            json.enumJobRoleId,
            json.roleName,
            json.grossCompensationPackage,
            json.roleDescription,
            json.requirements
        );
    }
}

// Your JSON data
// var jsonData = {
//     "walkinJobRoleId": 1,
//     "enumJobRoleId": 1,
//     "roleName": "Instructional Designer",
//     "grossCompensationPackage": "Rs. 5,00,000 lpa",
//     "roleDescription": [
//         "Generate highly interactive and innovative instructional strategies for e-learning solutions",
//         "Develop course structure and learning specifications addressing the requirements of the target audience",
//         "Construct appropriate testing strategies to ensure learners' understanding and performance",
//         "Address usability issues - Keep abreast of new trends in e-learning - Ensure that the instructional strategies are as per global standards",
//         "Prepare instructional design checklists and guidelines - Check for quality assurance"
//     ],
//     "requirements": [
//         "Experience in creating instructional plans and course maps",
//         "Experience in the use of media like graphics, illustrations, photographs, audio, video, animations, and simulations in instruction",
//         "Awareness of different instructional design models and familiarity with instructional and learning theories",
//         "Awareness of latest trends in e-learning and instructional design - Strong client consulting/interfacing skills.",
//         "Ability to guide clients to focus on specific objectives and teaching points - Strong meeting facilitation, presentation and interpersonal skills",
//         "A thorough understanding of the web as an instructional medium",
//         "Post graduate degree in Education, Instructional Design, Mass Communication or Journalism"
//     ]
// };

// // Creating an instance of WalkinJobRoleModel
// var jobRole = WalkinJobRoleModel.FromJson(jsonData);

// // Testing
// console.log(jobRole);
