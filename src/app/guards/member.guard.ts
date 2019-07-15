import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

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
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      let isMember:boolean  = (this.authService.hasClaim(0)) ? true : false
      if (isMember) {
        return true
      } else {
        this.authService.logout();
        this.messageService.alert('Our mobile applications can only be used by our members!', 'Members Only')
        this.router.navigate(['/auth']);
        return false
      }
    } else {
      this.authService.refreshData()
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
