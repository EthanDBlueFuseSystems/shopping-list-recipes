import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent{
    isLoginMode:boolean = true;
    isLoading:boolean = false;
    error:string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    constructor(private authService:AuthService, private router:Router, private componentFactory:ComponentFactoryResolver){}

    oneSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }

    //On form submit
    onSubmit(form: NgForm){
        // console.log(form.value);
        if(!form.valid){
            return;
        }
        //get email and password from form
        const email = form.value.email;
        const password = form.value.password;
        //create an authentication observable expecting the data of AuthResponseData
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        }else{
            authObs = this.authService.signup(email, password);
        }
        //subscribe to response to handle response after authentication
        authObs.subscribe(response =>{
            console.log(response)
            this.isLoading = false;
            this.router.navigate(['/recipes']);

        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });
        
        form.reset();
    }

    private showErrorAlert(message:string){
        const alertCmpFactory = this.componentFactory.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        hostViewContainerRef.createComponent(alertCmpFactory);
    }

    onHandleError(){
        this.error = null;
    }


}