import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from '@ionic-native/keyboard';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private push: Push,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      Keyboard.hideFormAccessoryBar(false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initPushNotification();
    });
  }

  initPushNotification() {
    // check to see if this is a physical device if not "Eject, Eject, Eject!"
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not available. Must run on a physical device.');
      return;
    }

    // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {

      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }

    });

    // android stuff for later
    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    // this.push.createChannel({
    // id: "testchannel1",
    // description: "My first test channel",
    // // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
    // importance: 3
    // }).then(() => console.log('Channel created'));

    // // Delete a channel (Android O and above)
    // this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

    // // Return a list of currently configured channels
    // this.push.listChannels().then((channels) => console.log('List of channels', channels))

    // to initialize push notifications

    const options: PushOptions = {
      android: {},
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
    }

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification)
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData
    });

    pushObject.on('registration').subscribe((registration: any) => {
      // Register
      // registration.registrationId
      // this.platform.is("ios");
      // this.platform.is("android");

      if (registration && registration.registrationId) {
        const regId = (registration.registrationId as string).replace('<', '').replace('>','');
        const storedRegId = localStorage.getItem('pushRegistrationId');

        // dont re-register if this device is already registered
        if (regId != storedRegId) {
          if (this.platform.is("ios")) {
            this.userService.registerForPushNotifications(regId, 1).subscribe((results) => {
              if (!(results instanceof HttpErrorResponse)) {
                // save back in local storage
                localStorage.setItem('pushRegistrationId', regId)
                console.log('Device registered with BendroCorp API', registration)
              }
            });
          } else if (this.platform.is("android")) {
            console.error('Android is currently not supported.');
            // this.userService.registerForPushNotifications(registration.registrationId, 2).subscribe((results) => {
  
            // });
          } else {
            console.warn('Device not currently supported for push notifications.')
          }
        }
      } else {
        
      }
    });

    pushObject.on('error').subscribe(error => {
      console.error('Error with Push plugin', error)
      // e.message
    });
  }
}
