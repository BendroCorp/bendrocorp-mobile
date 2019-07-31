import { Component, OnInit } from '@angular/core';
import { NavController, IonNav, ModalController } from '@ionic/angular';
import { RequestsService } from 'src/app/services/requests.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.page.html',
  styleUrls: ['./more-menu.page.scss'],
})
export class MoreMenuPage implements OnInit {
  pendingApprovals: number = 0;

  constructor(
    private nav: NavController,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController) { }

  ngOnInit() {
    this.userService.fetchPendingApprovalsCount().subscribe((result) => {
      this.pendingApprovals = result;
    });
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

}
