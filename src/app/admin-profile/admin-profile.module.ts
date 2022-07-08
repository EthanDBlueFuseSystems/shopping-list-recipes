import { NgModule } from "@angular/core";
import { AdminProfileComponent } from "./admin-profile.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AdminProfileDetailComponent } from "./admin-profile-detail/admin-profile-detail.component";
import { AdminProfileEditComponent } from "./admin-profile-edit/admin-profile-edit.component";

@NgModule({
    declarations:[
        AdminProfileComponent,
        AdminProfileDetailComponent,
        AdminProfileEditComponent,
    ],
    imports:[RouterModule.forChild([{path: '', component: AdminProfileComponent}]), 
    CommonModule, 
    ReactiveFormsModule, 
    SharedModule],
    exports:[],
})


export class AdminProfileModule{}