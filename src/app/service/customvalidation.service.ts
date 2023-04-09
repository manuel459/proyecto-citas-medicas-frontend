import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor() { }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any} => {
      if (!control.value) {
        return null as any;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).(?=.*?[^a-zA-Z0-9]).{8,}$');
      const emojiRegex = /[\u{1F600}-\u{1F6FF}]/gu;
      const spaceRegex = /\s/;
      console.log(!control.value.match(emojiRegex))
      const valid = regex.test(control.value) && !control.value.match(emojiRegex) && !spaceRegex.test(control.value);
      console.log(valid)
      return valid ? null as any : { invalidPassword: true };
    };
  }

//   MatchPassword(password: string, confirmPassword: string) {
//     return (formGroup: FormGroup) => {
//       const passwordControl = formGroup.controls[password];
//       const confirmPasswordControl = formGroup.controls[confirmPassword];

//       if (!passwordControl || !confirmPasswordControl) {
//         return null;
//       }

//       if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
//         return null;
//       }

//       if (passwordControl.value !== confirmPasswordControl.value) {
//         confirmPasswordControl.setErrors({ passwordMismatch: true });
//       } else {
//         confirmPasswordControl.setErrors(null);
//       }
//     }
//   }
}
