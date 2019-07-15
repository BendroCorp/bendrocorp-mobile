import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastController: ToastController, private dialogs: Dialogs) { }

  alert(message: string, title: string = null) {
    this.dialogs.alert(message, title)
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
