import { FormGroup } from "@angular/forms"


export function MatchPasswordValidator(inPassword: string, inConfirmPassword: string){
    return (formGroup: FormGroup) => {
        const password = formGroup.controls[inPassword];
        const confirmPassword = formGroup.controls[inConfirmPassword];

        if(password !== confirmPassword){
            console.log("Password doesn't match");
            
        }

    }
}