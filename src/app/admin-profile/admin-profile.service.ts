import { Injectable, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../auth/user.model";

@Injectable({providedIn:'root'})


export class AdminPanelService implements OnInit{
    
    users:User;
    usersSub:Subscription; 
    
    constructor(){}   

    ngOnInit(){
        
    }



}