import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightLogService } from 'src/app/services/flight-log.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FlightLog } from 'src/app/models/flight-log.model';
import { MessageService } from 'src/app/services/message.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddUpdateFlightLogPage } from './add-update-flight-log/add-update-flight-log.page';

@Component({
  selector: 'app-flight-log',
  templateUrl: './flight-log.page.html',
  styleUrls: ['./flight-log.page.scss'],
})
export class FlightLogPage implements OnInit, OnDestroy {
  flightLogs: FlightLog[];
  flightLogSubscription: Subscription;
  initialDataLoaded: boolean;
  loadingIndicator: any;

  constructor(
    private flightLogService: FlightLogService,
    private messageService: MessageService,
    private navController: NavController,
    private modalController: ModalController,
    private loading: LoadingController) {
      this.flightLogSubscription = this.flightLogService.dataRefreshAnnounced$.subscribe((results) => {
        this.retrieveFlightLogs();
      });
    }

  doRefresh(event: any) {
    this.retrieveFlightLogs(event);
  }

  async archiveFlightLog(flightLog: FlightLog) {
    if (await this.messageService.confirmation('Are you sure you want to archive this flight log?') === 1) {
      this.flightLogService.delete(flightLog).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.flightLogs.splice(this.flightLogs.findIndex(x => x.id === flightLog.id), 1);
        }
      });
    }
  }

  openFlightLog(flightLog: FlightLog) {
    console.log(flightLog);

    this.flightLogService.setPassData(flightLog);
    this.navController.navigateForward(`/tabs/more/flight-log/details/${flightLog.id}`);
  }

  async addUpdateFlightLog(flightLog?: FlightLog) {
    if (flightLog) {
      this.flightLogService.setPassData(flightLog);
    }

    const modal = await this.modalController.create({
      component: AddUpdateFlightLogPage
    });
    return await modal.present();
  }

  async retrieveFlightLogs(event?: any) {
    this.flightLogService.list().subscribe(async (results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.flightLogs = results;
        console.log(this.flightLogs);
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

  async ngOnInit() {
    this.loadingIndicator = await this.loading.create({
      message: 'Loading'
    });
    await this.loadingIndicator.present();
  }

  ngOnDestroy() {
    if (this.flightLogSubscription) {
      this.flightLogSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.retrieveFlightLogs();
  }

  ionViewDidLeave() {
  }

}
