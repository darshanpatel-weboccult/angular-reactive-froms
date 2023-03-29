import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormsComponent } from './user-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule} from '@angular/material/core';
import { MatRadioModule} from '@angular/material/radio';




@NgModule({
  declarations: [
    UserFormsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule
  ],
  exports:[
    UserFormsComponent
  ],
  providers:[
  ]
})
export class UserFormsModule { }
