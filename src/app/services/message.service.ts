import { Injectable } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastController: ToastController, private dialogs: Dialogs, private platform: Platform) { }

  alert(message: string, title: string = null) {
    if (this.platform.is('cordova')) {
      this.dialogs.alert(message, title);
    } else {
      alert(message);
    }
  }

  /**
   * [DEPRECATED] Display a confirmation message to the user.
   * @param message The message you want to display to the user for confirmation
   * @returns 1 or nother
   */
  confirmation(message: string): Promise<number> {
    return this.dialogs.confirm(message);
  }

  /**
   * Display a confirmation message to the user either using Cordova or a standard JS confirm if Cordova is not available.
   * @param message The message you want to display to the user for confirmation
   * @returns boolean - true if OKed, false otherwise
   */
  async confirmation_alt(message: string): Promise<boolean> {
    if (this.platform.is('cordova')) {
      const results = await this.dialogs.confirm(message);
      return (results === 1) ? true : false;
    } else {
      return confirm(message);
    }
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
