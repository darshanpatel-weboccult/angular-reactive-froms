import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const path = route.routeConfig?.path ?? '';
    const user = this.authService.getUser();

    if (path === '') {
      if (!user) {
        this.router.navigate(['/auth']);
      } else {
        if (user.role === 'CSR') {
          this.router.navigate(['/user-list']);
        } else {
          this.router.navigate(['/user-form']);
        }
      }
      return false;
    }

    if (path === 'auth') {
      if (user) {
        this.snack.open('You already have logged in', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['warning'],
        });
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    if (path === 'user-form') {
      if (!user) {
        this.snack.open('Please Login First To Access', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['warning'],
        });
        this.router.navigate(['/auth']);
        return false;
      }

      if (user.role === 'Admin' || user.role === 'Customer') {
        return true;
      } else {
        this.snack.open("You Don't have permission to access this page", 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error'],
        });
        this.router.navigate(['/user-list']);
        return false;
      }
    }

    if (path === 'user-list') {
      if (!user) {
        this.snack.open('Please Login First To Access', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['warning'],
        });
        this.router.navigate(['/auth']);
        return false;
      }

      if (user.role === 'Admin' || user.role === 'CSR') {
        return true;
      } else {
        this.snack.open("You Don't have permission to access this page", 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error'],
        });
        return false;
      }
    }

    return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const user = this.authService.getUser();
    if (!user) {
      this.snack.open('Please Login First To Access', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['warning'],
      });
      this.router.navigate(['/auth']);
      return false;
    }

    if (user.role === 'Admin' || user.role === 'CSR') {
      return true;
    } else {
      this.snack.open("You Don't have permission to access this page", 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error'],
      });
      return false;
    }
  }
}
