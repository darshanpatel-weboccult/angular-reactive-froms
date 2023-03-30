import { Component } from '@angular/core';
import { AuthService, User } from './Shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user:User | null = null;
  constructor(private authService:AuthService){
    authService.getIsLoggedInStream().subscribe((isLoggedIn:boolean) => {
      this.user = authService.getUser();
    })
  }
}
