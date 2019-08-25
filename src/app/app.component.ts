import { Component, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from '@ionic-native/keyboard';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PushRegistarService } from './services/push-registar.service';
import { AppBadgeService } from './services/app-badge.service';
import { Subscription, Observable, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {
  // NOTES: Push notifications
  // https://medium.com/@ankushaggarwal/push-notifications-in-ionic-2-658461108c59
  // https://ionicframework.com/docs/native/push
  authRefreshTicker: Observable<number> = interval(1000 * 60 * 3); // every 3 minutes. Access token expires every 6
  authRefreshSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private pushRegistar: PushRegistarService,
    private badgeService: AppBadgeService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      Keyboard.hideFormAccessoryBar(false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authRefreshTicker.subscribe((tick) => {
        console.log('Starting access token refresh...');
        this.authService.refreshLogin(this.authService.retrieveSecureStoreLogin()).subscribe((results) => {
          if (!(results instanceof HttpErrorResponse)) {
            this.authService.setSession(results.id_token);
            console.log('Access token refreshed!');
          } else {
            console.log('Access token refresh failed!');
          }
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.authRefreshSubscription) {
      this.authRefreshSubscription.unsubscribe();
    }
  }

}
