import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, IonNav, ModalController } from '@ionic/angular';
import { RequestsService } from 'src/app/services/requests.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SettingsPage } from '../settings/settings.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.page.html',
  styleUrls: ['./more-menu.page.scss'],
})
export class MoreMenuPage implements OnInit, OnDestroy {
  pendingApprovals: number = 0;
  approvalCountSubscription: Subscription;

  constructor(
    private nav: NavController,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController) {
      this.approvalCountSubscription = this.userService.approvalsDataRefreshAnnounced$.subscribe(() => {
        this.fetchPendingApprovalCount();
      });
    }

  fetchPendingApprovalCount() {
    this.userService.fetchPendingApprovalsCount().subscribe((result) => {
      this.pendingApprovals = result;
    });
  }

  ionViewWillEnter() {
    this.fetchPendingApprovalCount();
  }

  ngOnInit() {
  }

  openMenuItem(uri: string) {
    console.log(`menu try nav: ${uri}`);
    this.nav.navigateForward(uri);
  }

  async openSettings() {
    const modal = await this.modalController.create({
      component: SettingsPage
    });
    return await modal.present();
  }

  doLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    if (this.approvalCountSubscription) {
      this.approvalCountSubscription.unsubscribe();
    }
  }

}
