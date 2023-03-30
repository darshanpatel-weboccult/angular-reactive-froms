import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormsModule } from './Components/user-forms/user-forms.module';
import { UserTableModule } from './Components/user-table/user-table.module';
import { AuthModule } from './Components/auth/auth.module';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    UserFormsModule,
    UserTableModule,
    MatSnackBarModule,
    AuthModule
  ],
  providers: [
    MatSnackBar
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
