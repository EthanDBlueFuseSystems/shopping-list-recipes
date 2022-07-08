
import { Component, OnInit } from "@angular/core"
import { User } from "src/app/auth/user.model";


@Component({
    selector: 'app-admin-profile-detail',
    templateUrl: './admin-profile-detail.component.html',
})


export class AdminProfileDetailComponent implements OnInit{

    title:string;
    user: User;

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.checkAdmin();
    }

    checkAdmin(){
        if(this.user.id){
            this.title = 'Admin Profile';
        }   
    }
}