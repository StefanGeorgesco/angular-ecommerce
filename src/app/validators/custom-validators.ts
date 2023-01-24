import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static notOnlyWhiteSpaces(control: FormControl): ValidationErrors | null {

        if (control.value.length > 0 && control.value.trim().length === 0) {
            return { notOnlyWhiteSpaces: true };
        } else {
            return null;
        }
    }
}
