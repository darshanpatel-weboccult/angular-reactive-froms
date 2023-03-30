import { Component } from '@angular/core';
import {
  UserFormService,
  UserFormValues,
} from 'src/app/Shared/user-form.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  data: UserFormValues[] = [];
  displayColumns: string[] = [
    'name',
    'dob',
    'gender',
    'email',
    'phone',
    'street',
    'city',
    'state',
    'pin',
  ];

  constructor(private ufService: UserFormService) {
    ufService.getSubmissions().subscribe((submissions: UserFormValues[]) => {
      this.data = submissions;
    });
  }
}
