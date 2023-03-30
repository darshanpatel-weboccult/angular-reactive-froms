import { Component } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  UserFormService,
  UserFormValues,
} from 'src/app/Shared/user-form.service';
import {
  emailValidator,
  nameValidator,
  phoneValidator,
  pinValidator,
  requiredValidator,
} from './validators';

@Component({
  selector: 'app-user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.scss'],
})
export class UserFormsComponent {
  constructor(
    private fb: FormBuilder,
    private ufService: UserFormService,
    private snack: MatSnackBar
  ) {}

  // Nested Reactive Form
  userForm = this.fb.group({
    name: ['', [nameValidator]],
    email: ['', [emailValidator]],
    dob: ['', [requiredValidator('Dob')]],
    gender: ['', [requiredValidator('Gender')]],
    phone: ['', [phoneValidator]],
    address: this.fb.group({
      street: ['', [requiredValidator('Street')]],
      city: ['', [requiredValidator('City')]],
      state: ['', [requiredValidator('State')]],
      pin: ['', [pinValidator]],
    }),
  });

  // To Disable Future Dates from calendar
  dateFilter(date: Date | null): boolean {
    return date ? date.getTime() < new Date().getTime() : false;
  }

  // Gathers Form data and passes to addSubmission method of userForm Service
  handleSubmit(formDirective: FormGroupDirective) {
    if (this.userForm.invalid || !this.userForm.controls) {
      return;
    }

    const values: UserFormValues = {
      name: this.userForm.controls.name.value as string,
      email: this.userForm.controls.email.value as string,
      dob: new Date(
        this.userForm.controls.dob.value as string
      ).toLocaleDateString(),
      gender: this.userForm.controls.gender.value as string,
      phone: this.userForm.controls.phone.value as string,
      street: this.userForm.controls.address.controls.street.value as string,
      state: this.userForm.controls.address.controls.state.value as string,
      city: this.userForm.controls.address.controls.city.value as string,
      pin: this.userForm.controls.address.controls.pin.value as string,
    };

    this.ufService.addSubmission(values);
    formDirective.resetForm();
    this.snack.open('User Data Added', 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['info'],
    });
  }
}
