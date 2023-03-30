import { Injectable } from '@angular/core';
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
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const path = route.routeConfig?.path ?? '';
    const user = this.authService.getUser();

    if (path === 'user-form') {
      if (!user) {
        this.router.navigate(['/auth']);
        return false;
      }

      if (user.role === 'Admin' || user.role === 'Customer') {
        return true;
      } else {
        return false;
      }
    }

    if (path === 'user-list') {
      if (!user) {
        this.router.navigate(['/auth']);
        return false;
      }

      if (user.role === 'Admin' || user.role === 'CSR') {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const user = this.authService.getUser();
    if (!user) {
      this.router.navigate(['/auth']);
      return false;
    }

    if (user.role === 'Admin' || user.role === 'CSR') {
      return true;
    } else {
      return false;
    }
  }
}
