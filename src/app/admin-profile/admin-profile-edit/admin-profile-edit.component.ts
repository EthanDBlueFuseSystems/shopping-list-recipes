
import {Component, OnInit, Input} from '@angular/core'
import { User } from 'src/app/auth/user.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-admin-profile-edit',
    templateUrl: './admin-profile-edit.component.html',
})

export class AdminProfileEditComponent implements OnInit{

    profile: User; 

    constructor(){}

    ngOnInit(): void{
        this.profile = JSON.parse(localStorage.getItem('userData'));
    }

    onSubmit(form: NgForm){
        console.log(form);
    }

}