import { NgModule } from "@angular/core";
import { AdminPanelComponent } from "./admin-panel.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
@NgModule({
    declarations:[
        AdminPanelComponent
    ],
    imports:[RouterModule, CommonModule, ReactiveFormsModule, SharedModule],
    exports:[],
})


export class AdminPanelModule{}