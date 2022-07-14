import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    forgotPasswordForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.forgotPasswordForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email])
        });
    }

    onSubmit(){
        let email = this.forgotPasswordForm.value.email;
        console.log(email);

        /* 
            logic to send email using firebase
        */
    }

}
