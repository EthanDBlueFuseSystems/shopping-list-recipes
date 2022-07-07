import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject} from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
    //create new subject with data as user
    //Subjects are observables that you can subscribe to
    user = new BehaviorSubject<User>(null) 
    private tokenExpirationTimer: any; 

    constructor(private http:HttpClient, private router: Router){}

    signup(email: string, password:string){
        //Make post request to signup endpoint expecting AuthResponseData to be returned
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseApiKey,
        {
            email:email,
            password:password,
            returnSecureToken: true,
        })
        .pipe(catchError(this.handleError), //catch errors
        tap(responseData => { //authenticate the user after request 
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }));
    }
    
    private handleAuthentication(email:string, userId:string, token:string, expiresIn:number){
        //create a new expiration date by getting the current time in seconds and adding expires in
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        //create a new user object with authentication details
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user))
    }

    login(email:string, password:string){
        //make a post request to login endpoint casting the data to AuthResponseData
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseApiKey,
        {
            email:email,
            password: password,
            returnSecureToken: true,
        }).pipe(catchError(this.handleError),
        tap(responseData => { //authenticate the user after request 
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        })); //pipe data to error handler to catch any errors 
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.router.navigate(['/auth']);
    }

    autoLogout(expirationDuration: number){
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    private handleError(errorRes: HttpErrorResponse){
        //set default error if non matches
        let errorMessage = 'An unknow error occurred while signing'
        //if there is not an error  or an error message
        if(!errorRes.error || !errorRes.error.error){
            //return default error
            return throwError(errorMessage);
        }
        console.log(errorRes);
        //Authentication errors
        //https://firebase.google.com/docs/reference/rest/auth
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists, please try another email';
                break
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is invalid, please try again later';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'USER_DISABLED':
                errorMessage = 'Account is disabled by admin'
        }
        return throwError(errorMessage)
    }


}
