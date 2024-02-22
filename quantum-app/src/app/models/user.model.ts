export class UserModel {
    constructor(
        public id: number,
        public userEmail: string,
        private _token: string,
        private _tokenExpiresAt: Date,
        public role: string,
    ) { }

    get token() {
        if (!this._tokenExpiresAt || new Date() > this._tokenExpiresAt) {
            console.log('tokenExpired');
            return undefined;
        }
        return this._token;
    }
}
