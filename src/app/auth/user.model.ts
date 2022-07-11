

export class User{

    constructor(
        public firstname: string,
        public surname: string,
        public email:string, 
        public userPriv: number,
        public id:string, 
        private _token:string,
        private _tokenExpirationDate: Date){}

    get token(){
        //if there isn't a token and the current date is greateer than the token expiration date
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;

    }
}