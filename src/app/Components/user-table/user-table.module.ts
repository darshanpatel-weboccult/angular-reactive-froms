import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table.component';
import {MatTableModule} from '@angular/material/table';
import { UserTableRoutingModule } from './user-table-routing.module';



@NgModule({
  declarations: [
    UserTableComponent
  ],
  imports: [
    UserTableRoutingModule,
    CommonModule,
    MatTableModule,
  ],
  exports:[
    UserTableComponent
  ]
})
export class UserTableModule { }
