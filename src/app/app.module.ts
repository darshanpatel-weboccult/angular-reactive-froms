import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormsModule } from './Components/user-forms/user-forms.module';
import { UserTableModule } from './Components/user-table/user-table.module';
import { AuthComponent } from './Components/auth/auth.component';

@NgModule({
  declarations: [AppComponent, AuthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    UserFormsModule,
    UserTableModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
