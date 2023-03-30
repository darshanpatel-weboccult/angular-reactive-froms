import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormsComponent } from './Components/user-forms/user-forms.component';
import { UserTableComponent } from './Components/user-table/user-table.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-form',
  },
  {
    path: 'user-form',
    component: UserFormsComponent,
  },
  {
    path: 'user-list',
    component: UserTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
