import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth.component';
import { UserFormsComponent } from './Components/user-forms/user-forms.component';
import { AuthGuard } from './Shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    redirectTo: '',
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-form',
    component: UserFormsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-list',
    loadChildren: () =>
      import('./Components/user-table/user-table.module').then(
        (module) => module.UserTableModule
      ),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
