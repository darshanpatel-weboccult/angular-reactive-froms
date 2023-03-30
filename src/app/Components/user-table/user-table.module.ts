import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    UserTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports:[
    UserTableComponent
  ]
})
export class UserTableModule { }
