import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-interview-hints',
  templateUrl: './profile-interview-hints.page.html',
  styleUrls: ['./profile-interview-hints.page.scss'],
})
export class ProfileInterviewHintsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {
  }

}
