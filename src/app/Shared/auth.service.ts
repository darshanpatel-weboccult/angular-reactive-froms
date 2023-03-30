import {  Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

export interface User {
  role: 'Admin' | 'CSR' | 'Customer';
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
  private currentUser: User | null = this.getLoggedInUser();
  private users: User[] = [
    {
      role: 'Admin',
      name: 'Darshan Patel',
      email: 'dhpatelhhpatel123@gmail.com',
      password: 'dhp@2608',
    },
    {
      role: 'CSR',
      name: 'John Doe',
      email: 'johndoe123@gmail.com',
      password: 'john@321',
    },
    {
      role: 'Customer',
      name: 'Jasmine',
      email: 'jasmine2002@gmail.com',
      password: 'flower@2002',
    },
  ];
  private isLoggedInStream: BehaviorSubject<boolean>;

  constructor(private router: Router, private snack:MatSnackBar) {
    this.isLoggedInStream = new BehaviorSubject<boolean>(
      this.currentUser !== null
    );
  }

  // performs basic login (logged user stored in session storage )
  login(email: string, password: string): boolean {
    console.log(email, password);
    
    const user: User | undefined = this.users.find(
      (localUser: User) =>
        localUser.email === email && localUser.password === password
    );

    if (!user) {
      this.isLoggedInStream.next(false);
      return false;
    }
    this.currentUser = user;
    sessionStorage.setItem('user', JSON.stringify(user));
    this.isLoggedInStream.next(true);
    this.snack.open("Welcome Back "+ user.name, 'OK' ,{
      duration: 3000,
      horizontalPosition:'right',
      verticalPosition:'top',
      panelClass:['success']
    })
    return true;
  }


  // Removes logged user from session storage
  logout(): void {
    sessionStorage.removeItem('user');
    this.currentUser = this.getLoggedInUser();
    this.isLoggedInStream.next(false);
    this.snack.open("Logout Successful !", 'OK' ,{
      duration: 3000,
      horizontalPosition:'right',
      verticalPosition:'top',
      panelClass:['success']
    })
    this.router.navigate(['/auth']);
  }

  // Retrieves  user from session storage
  private getLoggedInUser(): User | null {
    const user = sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  // Returns current user
  getUser(): User | null {
    return this.currentUser;
  }

  // returns boolean observable that indicates auth status
  getIsLoggedInStream(): Observable<boolean> {
    return this.isLoggedInStream.asObservable();
  }
}
