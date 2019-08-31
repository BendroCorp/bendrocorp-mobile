import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { ApplicationService } from 'src/app/services/application.service';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ProfileInterviewHintsPage } from '../profile-interview-hints/profile-interview-hints.page';

@Component({
  selector: 'app-profile-interview',
  templateUrl: './profile-interview.page.html',
  styleUrls: ['./profile-interview.page.scss'],
})
export class ProfileInterviewPage implements OnInit {

  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private profileService: ProfileService,
    private modalController: ModalController
  ) { }
  character: Character;
  lockForReview: boolean;

  updateInterview() {
    if (this.lockForReview) {
      this.character.application.interview.locked_for_review = true;
    }

    this.applicationService.updateInterview(this.character.application.interview).subscribe((results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.profileService.refreshData();
      }
    });
  }

  async openInterviewHints() {
    const modal = await this.modalController.create({
      component: ProfileInterviewHintsPage,
      componentProps: {
        character: this.character
      }
    });
    return await modal.present();
  }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      console.log('Loading route info');
      this.character = this.router.getCurrentNavigation().extras.state.character;
      console.log(this.character);
      console.log(this.character.application.interview);
      this.lockForReview = this.character.application.interview.locked_for_review;
    } else {
      console.error('Route info could not be loaded');
    }
  }

}
