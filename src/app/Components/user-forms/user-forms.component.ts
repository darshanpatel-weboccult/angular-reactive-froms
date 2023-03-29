// import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  emailValidator, nameValidator, phoneValidator, pinValidator, requiredValidator} from './validators';

@Component({
  selector: 'app-user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.scss'],
})
export class UserFormsComponent {
  constructor(private fb: FormBuilder,) {
  }

  userForm = this.fb.group({
    name: ['', [nameValidator]],
    email: ['', [emailValidator]],
    dob: ['', [requiredValidator('Dob')]],
    gender: ['', [requiredValidator('Gender')]],
    phone: ['', [phoneValidator]],
    address: this.fb.group({
      street: ['', [requiredValidator('Street')]],
      city: ['', [requiredValidator('City')]],
      state: ['',[requiredValidator('State')] ],
      pin: ['', [pinValidator]],
    }),
  });

    
}
