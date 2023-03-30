import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value as string;

  if (!value?.length) {
    return { error: 'Name Is Required !' };
  }
  if (value?.length < 3) {
    return { error: 'Name Must Be At Least 3 Chars Long !' };
  }
  return null;
}

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value as string;
  const validator =
    /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  if (!value?.length) {
    return { error: 'Email Is Required !' };
  }
  if (!validator.test(value)) {
    return { error: 'Please Enter A Valid Email !' };
  }
  return null;
}

export function requiredValidator(field: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (field === 'Dob') {
      if (!control.value) {
        return { error: 'Birth Date Is Required !' };
      }

      return null;
    }
    const value = control.value as string;
    if (!value?.length) {
      return { error: field + ' Is Required !' };
    }
    return null;
  };
}

export function phoneValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = (control.value as number)?.toString();
  if (!value?.length) {
    return { error: 'Phone No Is Required !' };
  }
  if (value?.length !== 10 || isNaN(Number(value)) || value.charAt(0) === '0') {
    return { error: 'Please Enter a valid Phone No. !' };
  }
  return null;
}

export function pinValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = (control.value as number)?.toString();
  if (!value?.length) {
    return { error: 'Pin Is Required !' };
  }
  if (value?.length !== 6 || isNaN(Number(value))) {
    return { error: 'Please Enter a valid Pin No. !' };
  }
  return null;
}
