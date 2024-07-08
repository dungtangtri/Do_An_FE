import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export class CustomValidators {

  static confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const formGroup = group as FormGroup;
      const password = formGroup.get(passwordField);
      const confirmPassword = formGroup.get(confirmPasswordField);
      if (password?.value !== confirmPassword?.value) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

}
