import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Character, Division } from 'src/app/models/character.model';
import { MessageService } from 'src/app/services/message.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  divisions: Division[] = [];
  profileSubscription: Subscription;

  // loading indicator
  loadingIndicator: any;

  constructor(
    private profileService: ProfileService,
    private messageService: MessageService,
    private navController: NavController,
    private modalController: ModalController,
    private loading: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.profileSubscription = this.profileService.dataRefreshAnnounced$.subscribe(() => {
      this.fetchProfilesByDivision();
    });
  }

  fetchProfilesByDivision() {
    this.profileService.list_by_division().subscribe((results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.divisions = results;
      }

      if (this.loadingIndicator) {
        this.loading.dismiss();
      }
    });
  }

  sortDivision(division: Division) {
    return division.division_members.sort((a, b) => {
      return a.current_job_level - b.current_job_level;
    });
  }

  openProfileDetails(member: Character) {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        character: member
      }
    };

    this.router.navigate(['profile-details'], navigationExtras);
  }

  ionViewWillEnter() {
    this.fetchProfilesByDivision();
  }

  async ngOnInit() {
    this.loadingIndicator = await this.loading.create({
      message: 'Loading'
    });
    await this.loadingIndicator.present();
  }

  ngOnDestroy() {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

}
