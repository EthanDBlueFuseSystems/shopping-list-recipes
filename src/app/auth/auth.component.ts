import { Component,OnInit, ViewChild, } from "@angular/core";
import { FormGroup, FormControl, Validators,  } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit{
    isLoginMode:boolean = true;
    isLoading:boolean = false;
    isForgotPassword:boolean = false;

    error:string = null;

    authForm: FormGroup;//reactive form variable

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    constructor(private authService:AuthService, private router:Router){}

    ngOnInit(){
        this.authFormInit();
    }
    oneSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }

    forgotPassword(){
        this.isForgotPassword = !this.isForgotPassword;
    }

    matchPasswordValidator(password: string, confirmPassword: string):Boolean {
        return password !== confirmPassword ? false: true;
    }

    authFormInit(){
        console.log("form loading");
        this.authForm = new FormGroup({
            'firstname': new FormControl(''),
            'surname': new FormControl(''),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('',[ Validators.required, Validators.min(6)]),
            'confirmPassword': new FormControl('', [Validators.min(6)])
        });

        console.log("form loaded");
    }

    

    //On form submit
    onSubmit(){
        let submittedUser;

        if(!this.authForm.valid){
            return;
        }

        submittedUser = {
            firstname:this.authForm.value.firstname,
            surname:this.authForm.value.surname,
            email:this.authForm.value.email,
            password: this.authForm.value.password,
            confirmPassword: this.authForm.value.confirmPassword
        }

        console.log("Surname: " + this.authForm.value.surname);

        if(!this.matchPasswordValidator(submittedUser.password, submittedUser.confirmPassword)){
            this.error = "Passwords do not match, please try again";
            this.authForm.get('confirmPassword').setErrors({'invalid':true});
            return;
        }else{
            console.log("Password does match");
        }


        //create an authentication observable expecting the data of AuthResponseData
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if(this.isLoginMode){
            authObs = this.authService.login(submittedUser);
        }else{
            authObs = this.authService.signup(submittedUser);
        }
        //subscribe to response to handle response after authentication
        authObs.subscribe(response =>{
            console.log(response)
            this.isLoading = false;
            this.router.navigate(['/recipes']);

        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            // this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });
        
        this.authForm.reset();
    }

    onHandleError(){
        this.error = null;
    }


}