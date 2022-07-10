import { Directive, Input, OnInit} from "@angular/core";
import { Validator, FormGroup, NG_VALIDATORS } from "@angular/forms";
import { MatchPasswordValidator } from "../auth/match-password.validator";

@Directive({ 
    selector: '[appMatchPassword]',
    providers: []
})

export class MatchPasswordDirective implements Validator, OnInit{
    @Input('matchPassword') matchPassword: string[] = [];

    ngOnInit(){
        console.log("MatchPassword Directive");

    }

    validate(formGroup: FormGroup){
        console.log("Validate method");

        return MatchPasswordValidator(this.matchPassword[0], this.matchPassword[1]);
    }
}