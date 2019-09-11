import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate  {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
    ) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      const isMember: boolean  = (this.authService.hasClaim(0)) ? true : false;
      if (isMember) {
        return true;
      } else {
        this.authService.logout();
        this.messageService.alert('Our mobile applications can only be used by our members!', 'Members Only')
        this.router.navigate(['/auth']);
        return false;
      }
    } else {
      // if not logged in get a refresh token
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

      this.authService.refreshData();
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
