
import {Component, OnInit, Input} from '@angular/core'
import { User } from 'src/app/auth/user.model';

@Component({
    selector: 'app-admin-profile-edit',
    templateUrl: './admin-profile-edit.component.html',
})

export class AdminProfileEditComponent implements OnInit{

    profile: User; 

    constructor(){}

    ngOnInit(): void{

    }

}