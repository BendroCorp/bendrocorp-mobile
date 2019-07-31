import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, Platform } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.service';
import { NewPassword } from 'src/app/models/user.model';
import { MessageService } from 'src/app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TouchID } from '@ionic-native/touch-id/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  touchIdStatus: boolean = this.settingsService.touchIdEnabled();
  touchIdAvailable: boolean;
  passwordChange: NewPassword = {} as NewPassword;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private modalController: ModalController,
    private settingsService: SettingsService,
    private messageService: MessageService,
    private touchId: TouchID
    ) { }

  async doUpdatePassword() {
    if (this.passwordChange.original_password && this.passwordChange.password && this.passwordChange.password_confirmation) {
      if (this.passwordChange.password === this.passwordChange.password_confirmation) {
        this.authService.changePassword(this.passwordChange).subscribe(async (results) => {
          if (!(results instanceof HttpErrorResponse)) {
            this.messageService.toast('Password change successful!');
            if (this.settingsService.touchIdEnabled()) {
              let storedLogin = await this.authService.retrieveSecureStoreLogin();
              storedLogin.password = this.passwordChange.password;
              await this.authService.secureStoreLogin(storedLogin);
              storedLogin = null;
            }
            this.passwordChange = { } as NewPassword;
          }
        });
      } else {
        this.messageService.alert('Password and confirmation password must match!');
      }
    } else {
      this.messageService.alert('Please fill out the password form in entirety to change your password!');
    }
  }

  async changeTouchIdStatus() {
    if (this.platform.is('ios') && this.touchIdAvailable) {
      if (this.settingsService.touchIdEnabled()) {
        this.settingsService.disableTouchId();
        await this.authService.removeSecureStoreLogin();
      } else {
        try {
          await this.touchId.verifyFingerprint('Verifying who you are');
          this.settingsService.enableTouchId();
          this.messageService.alert('Touch ID is ready to go. Next time you log in we will securely store your credentials.');
        } catch (error) {
          this.settingsService.disableTouchId();
          this.touchIdStatus = false;
          this.messageService.alert('We could not authenticate you. Try again!');
        }
      }

      // this.touchIdStatus = this.settingsService.touchIdEnabled();
    } else {
      console.log('Not iOS - can\'t enable Touch ID');
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async ngOnInit() {
    try {
      this.touchIdAvailable = await this.touchId.isAvailable();
    } catch (error) {
      this.touchIdAvailable = false;
    }
  }

}
