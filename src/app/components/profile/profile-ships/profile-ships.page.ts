import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OwnedShip } from 'src/app/models/ship.models';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ProfileShipsAddUpdatePage } from '../profile-ships-add-update/profile-ships-add-update.page';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-ships',
  templateUrl: './profile-ships.page.html',
  styleUrls: ['./profile-ships.page.scss'],
})
export class ProfileShipsPage implements OnInit, OnDestroy {
  character: Character;
  userIsOwner: boolean;
  hrRights: boolean = (this.authService.hasClaim(12) || this.authService.hasClaim(9));
  canEdit: boolean = this.hrRights || this.userIsOwner;

  profileSubscription: Subscription;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService,
    private modalController: ModalController,
    private messageService: MessageService
  ) {
    this.profileSubscription = this.profileService.dataRefreshAnnounced$.subscribe(() => {
      this.profileService.fetch(this.character.id).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.character = results;
        }
      });
    });
  }

  async addUpdateShip(ownedShip?: OwnedShip) {
    const modal = await this.modalController.create({
      component: ProfileShipsAddUpdatePage,
      componentProps: {
        ownedShip
      }
    });
    return await modal.present();
  }

  async archiveShip(ownedShip: OwnedShip) {
    if (this.canEdit) {
      if (await this.messageService.confirmation_alt('Are you sure you want to archive this ship?')) {
        this.profileService.removeShip(ownedShip).subscribe((results) => {
          if (!(results instanceof HttpErrorResponse)) {
            this.character.owned_ships.splice(this.character.owned_ships.findIndex(x => x.id === ownedShip.id), 1);
            this.profileService.refreshData();
          }
        });
      }
    }
  }

  ngOnInit() {
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
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

}
