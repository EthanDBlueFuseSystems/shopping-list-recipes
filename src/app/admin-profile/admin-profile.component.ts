import { Component } from "@angular/core";

@Component({
    selector: "app-admin-profile",
    templateUrl: "./admin-profile.component.html",
})

export class AdminProfileComponent{
    constructor(){
        console.log("Admin profile");
    }
}