import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
})
export class ProfileDetailsPage implements OnInit, OnDestroy{
  // character
  characterId: number;
  character: Character;

  // permissions
  ceoRights: boolean = this.authService.hasClaim(9);
  hrRights: boolean = (this.authService.hasClaim(12) || this.authService.hasClaim(9));
  directorRights: boolean = this.authService.hasClaim(3);

  // subscriptions
  profileSubscription: Subscription;

  constructor(
    private messageService: MessageService,
    private profileService: ProfileService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.profileSubscription = this.profileService.dataRefreshAnnounced$.subscribe(() => {
      this.fetchCharacter();
    });
  }

  fetchCharacter() {
    this.profileService.fetch(this.characterId).subscribe((results) => {
      console.log(results);
      this.character = results;
    });
  }

  openProfileBackground() {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        character: this.character
      }
    };

    this.router.navigate(['profile-background'], navigationExtras);
  }

  openProfileServiceRecord() {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        character: this.character
      }
    };

    this.router.navigate(['profile-service-record'], navigationExtras);
  }

  openProfileApplication() {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        character: this.character
      }
    };

    this.router.navigate(['profile-application'], navigationExtras);
  }

  openProfileInterview() {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        character: this.character
      }
    };

    this.router.navigate(['profile-interview'], navigationExtras);
  }

  openProfileShips() {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        character: this.character
      }
    };

    this.router.navigate(['profile-ships'], navigationExtras);
  }

  async advanceApplication() {
    if (await this.messageService.confirmation_alt('Are you sure you want advance this application?')) {
      this.applicationService.advanceApplication(this.character).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.profileService.refreshData();
        }
      });
    }
  }

  async rejectApplication() {
    if (await this.messageService.confirmation_alt('Are you sure you want reject this application?')) {
      this.applicationService.rejectApplication(this.character).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.profileService.refreshData();
        }
      });
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.characterId = this.router.getCurrentNavigation().extras.state.character.id;
        console.log(this.characterId);
        if (this.characterId) {
          this.fetchCharacter();
        } else {
          this.router.navigateByUrl('/more/profile');
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

}
