import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormsComponent } from './Components/user-forms/user-forms.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'user-form'
  },
  {
    path:'user-form',
    component: UserFormsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
