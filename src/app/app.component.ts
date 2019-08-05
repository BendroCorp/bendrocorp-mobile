import { Component } from '@angular/core';

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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // NOTES: Push notifications
  // https://medium.com/@ankushaggarwal/push-notifications-in-ionic-2-658461108c59
  // https://ionicframework.com/docs/native/push
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
      // if (this.authService.isLoggedIn()) {
      //   this.pushRegistar.initPushNotifications();
      // }
    });
  }

}
