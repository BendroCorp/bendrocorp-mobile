import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true
    } else {
      this.authService.refreshData();

      // get the base path
      let path = `/${route.url.join('/')}`;

      // handle params
      let paramLength = Object.keys(route.queryParams).length;
      if (paramLength > 0) {
        path = `${path}?`;
      }

      // Iterate through any params which may also be in the url
      let i = 0
      for (var key in route.queryParams) {
        if (route.queryParams.hasOwnProperty(key)) {
          i++;
          let param = key + "=" + route.queryParams[key];
          path = `${path}${param}`;
          if (i < paramLength) {
            path = `${path}&`;
          }
        }
      }
      localStorage.setItem('authRedirect', path);
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
