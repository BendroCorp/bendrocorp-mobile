import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { Character } from 'src/app/models/character.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-update-background',
  templateUrl: './profile-update-background.page.html',
  styleUrls: ['./profile-update-background.page.scss'],
})
export class ProfileUpdateBackgroundPage implements OnInit {
  character: Character;
  // formError: boolean = (
  //                     (this.character == null)
  //                       ||
  //                     (this.character.description.length === 0 || this.character.background.length === 0)
  //                     );

  dataSubmitted: boolean = false;

  // perms - probably over protective... but ¯\_(ツ)_/¯
  userIsOwner: boolean;
  hrRights: boolean = (this.authService.hasClaim(12) || this.authService.hasClaim(9));
  canEdit: boolean = this.hrRights || this.userIsOwner;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private modalController: ModalController,
    private messageService: MessageService
  ) { }

  saveProfileBackground() {
    if (this.character && this.character.id) {
      this.dataSubmitted = true;
      this.profileService.update(this.character).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.messageService.toast('Character updated!');
          this.profileService.refreshData();
          this.dataSubmitted = false;
          this.dismiss();
        }
      });
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {
    if (this.character) {
      this.userIsOwner = (this.authService.retrieveUserSession().id === this.character.user_id) ? true : false;
    }
  }

}
