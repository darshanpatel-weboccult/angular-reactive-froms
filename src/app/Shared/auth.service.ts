import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private users: User[] = this.getLocalUsers();
  private isLoggedInStream: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    this.isLoggedInStream = new BehaviorSubject<boolean>(
      this.currentUser !== null
    );
  }

  login(email: string, password: string): boolean {
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
    return true;
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.currentUser = this.getLoggedInUser();
    this.isLoggedInStream.next(false);
    this.router.navigate(['/auth']);
  }

  private getLocalUsers(): User[] {
    const users = localStorage.getItem('Users');
    if (users) {
      return JSON.parse(users);
    }
    return [];
  }

  private getLoggedInUser(): User | null {
    const user = sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  getUser(): User | null {
    return this.currentUser;
  }
  getIsLoggedInStream(): Observable<boolean> {
    return this.isLoggedInStream.asObservable();
  }
}
