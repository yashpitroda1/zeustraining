export class JobRoleModel {
    constructor(public id: number, public roleName: string, public istoggle: boolean, public grossCompensationPackage?: string,
        public roleDescription?: string[], public requirements?: string[]) {
    }
}
