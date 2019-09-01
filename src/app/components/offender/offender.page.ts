import { Component, OnInit, OnDestroy } from '@angular/core';
import { OffenderService } from 'src/app/services/offender.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';
import { EventAddUpdatePage } from '../event/event-add-update/event-add-update.page';
import { Subscription } from 'rxjs';
import { Offender } from 'src/app/models/offender.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AddUpdateOffenderReportPage } from './add-update-offender-report/add-update-offender-report.page';

@Component({
  selector: 'app-offender',
  templateUrl: './offender.page.html',
  styleUrls: ['./offender.page.scss'],
})
export class OffenderPage implements OnInit, OnDestroy {
  offenders: Offender[];
  offenderSubscription: Subscription;
  initialDataLoaded: boolean = false;
  loadingIndicator: any;
  isAdmin = this.authService.hasClaim(16);

  constructor(
    private offenderService: OffenderService,
    private authService: AuthService,
    private router: Router,
    private nav: NavController,
    private modalController: ModalController,
    private messageService: MessageService,
    private loading: LoadingController
  ) { }

  doRefresh(event: any) {
    this.fetchOffenders(event);
  }

  async fetchOffenders(event?: any) {
    this.offenderService.list().subscribe(async (results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.offenders = results;
        console.log(this.offenders);
      }

      if (!this.initialDataLoaded) {
        this.initialDataLoaded = true;
        await this.loading.dismiss();
      }

      if (event) {
        event.target.complete();
      }
    });
  }

  async addOffenderReport(event?: Event) {
    const modal = await this.modalController.create({
      component: AddUpdateOffenderReportPage
    });
    return await modal.present();
  }

  ionViewWillEnter() {
    this.fetchOffenders();
    if (this.isAdmin) {
      // this.fetchExpiredEvents();
    }
  }

  async ngOnInit() {
    this.loadingIndicator = await this.loading.create({
      message: 'Loading'
    });
    await this.loadingIndicator.present();
  }

  ngOnDestroy() {
    if (this.offenderSubscription) {
      this.offenderSubscription.unsubscribe();
    }
  }

}
