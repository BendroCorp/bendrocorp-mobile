import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { ProfileUpdateBackgroundPage } from '../profile-update-background/profile-update-background.page';

@Component({
  selector: 'app-profile-background',
  templateUrl: './profile-background.page.html',
  styleUrls: ['./profile-background.page.scss'],
})
export class ProfileBackgroundPage implements OnInit, OnDestroy {
  character: Character;
  characterSubscription: Subscription;
  userIsOwner: boolean;
  hrRights: boolean = (this.authService.hasClaim(12) || this.authService.hasClaim(9));
  canEdit: boolean = this.hrRights || this.userIsOwner;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService,
    private modalController: ModalController
  ) {
    this.characterSubscription = this.profileService.dataRefreshAnnounced$.subscribe(() => {
      if (this.character && this.character.id) {
        this.profileService.fetch(this.character.id).subscribe((results) => {
          if (!(results instanceof HttpErrorResponse)) {
            this.character = results;
          }
        });
      }
    });
  }

  async openUpdateBackground() {
    if (this.canEdit) {
      const modal = await this.modalController.create({
        component: ProfileUpdateBackgroundPage,
        componentProps: {
          character: this.character
        }
      });
      return await modal.present();
    }
  }

  ngOnInit() {
    console.log('profile background init');

    if (this.router.getCurrentNavigation().extras.state) {
      console.log('Loading route info');
      this.character = this.router.getCurrentNavigation().extras.state.character;
      this.userIsOwner = (this.authService.retrieveUserSession().id === this.character.user_id) ? true : false;
      console.log(this.character);
    } else {
      console.error('Route info could not be loaded');
    }
  }

  ngOnDestroy() {
    if (this.characterSubscription) {
      this.characterSubscription.unsubscribe();
    }
  }

}
