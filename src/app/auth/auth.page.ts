import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { MessageService } from '../services/message.service';
import { Platform } from '@ionic/angular';
import { Login, StoredToken } from '../models/user.model';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  sessionEmail: string;
  sessionPassword: string;
  sessionCode: string;
  showLogin: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private settingsService: SettingsService,
    private platform: Platform,
    private touchId: TouchID) { }

  async doLogin() {
    if (this.sessionEmail && this.sessionPassword) {
      const stayLoggedIn = (await this.authService.trySecureStorage()) ? true : false;

      if (!stayLoggedIn) {
        console.warn('For some reason we can\'t keep you logged in. Probably because SecureStorage is not available!');
      }

      this.authService.login(this.sessionEmail, this.sessionPassword, this.sessionCode, stayLoggedIn).subscribe(async (results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.authService.setSession(results.id_token);

          // securely store the refresh_token
          await this.authService.secureStoreLogin({
            refresh_token: results.refresh_token
          } as StoredToken);

          // if we are on iOS lets see about Touch ID
          // https://ionicframework.com/docs/native/touch-id
          if (this.platform.is('ios')) {
            try {
              // make sure touch id is actually available
              await this.touchId.isAvailable();
              if (localStorage.getItem('useTouchId') == null) {
                // this should bea first time setup condition
                if (await this.messageService.confirmation('Would you like to use TouchID to protect your login?') === 1) {
                  try {
                    // verify with biometrics
                    await this.touchId.verifyFingerprint('Logging you in');
                    // set our option to use Touch ID
                    this.settingsService.enableTouchId();

                    // proceed normally
                    this.sessionEmail = null;
                    this.sessionPassword = null;
                    this.sessionCode = null;
                    this.showLogin = false;
                    this.router.navigateByUrl('/');

                  } catch (error) {
                    this.messageService.alert('You could not be biometrically verified. You can try again later.');
                  }
                } else {
                  // disable touch id
                  this.settingsService.disableTouchId();
                }
              } else {
                // in this condition the user has enabled touchid but needed to log in again for whatever reason
                // securely store the username and password
                await this.authService.secureStoreLogin({
                  refresh_token: results.refresh_token
                  // code: this.sessionCode // can't store the code will eventually need to store the seed somehow
                } as StoredToken);
              } // the other final condition is that this is not a first start and that the user has chosen not to use touch id

              // We could not check your biometic login information or you didn't want to use touch id
              this.sessionEmail = null;
              this.sessionPassword = null;
              this.sessionCode = null;
              this.showLogin = false;
              this.router.navigateByUrl('/');
            } catch (error) {
              console.log(error);
            }
          } else {
            this.sessionEmail = null;
            this.sessionPassword = null;
            this.sessionCode = null;
            this.showLogin = false;
            this.router.navigateByUrl('/');
          }
        }
      });
    }
  }

  async ionViewDidEnter() {
    if (this.authService.isLoggedOut()) {
      const existingLogin = await this.authService.retrieveSecureStoreLogin();
      if (existingLogin) {
        if (this.platform.is('ios') && localStorage.getItem('useTouchId') === 'true') {
          try {
            if (existingLogin) {
              await this.touchId.isAvailable();
              await this.touchId.verifyFingerprint('Logging you in');
              //
              this.authService.refreshLogin(existingLogin).subscribe((results) => {
                if (!(results instanceof HttpErrorResponse)) {
                  this.authService.setSession(results.id_token);
                  this.router.navigateByUrl('/');
                } else {
                  this.messageService.alert('Your stored credentials were invalid. Please login again.');
                  this.showLogin = true;
                }
              });
            } else {
              this.showLogin = true;
            }
          } catch (error) {
            await this.authService.removeSecureStoreLogin();
            this.messageService.alert('We could not log you in biometrically at this time. Please login via the form.');
            this.showLogin = true;
          }
        } else { // not iOS
          this.authService.refreshLogin(existingLogin).subscribe((results) => {
            if (!(results instanceof HttpErrorResponse)) {
              this.authService.setSession(results.id_token);
              this.router.navigateByUrl('/');
            } else {
              this.messageService.alert('Your stored credentials were invalid. Please login again.');
              this.showLogin = true;
            }
          });
        }
      } else {
        console.log('Touch ID is not enabled or not available just show login.');
        this.showLogin = true;
      }
    }
  }

  ionViewDidLeave() {
    this.showLogin = false;
  }

  ngOnInit() {
  }

}
