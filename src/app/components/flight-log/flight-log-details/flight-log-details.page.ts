import { Component, OnInit } from '@angular/core';
import { FlightLogService } from 'src/app/services/flight-log.service';
import { ActivatedRoute } from '@angular/router';
import { FlightLog } from 'src/app/models/flight-log.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-flight-log-details',
  templateUrl: './flight-log-details.page.html',
  styleUrls: ['./flight-log-details.page.scss'],
})
export class FlightLogDetailsPage implements OnInit {
  flightLogId: number = parseInt(this.route.snapshot.paramMap.get('flight_log_id'))
  flightLog: FlightLog;
  initialDataLoaded: boolean = false;
  loadingIndicator: any;
  constructor(
    private flightLogService: FlightLogService,
    private route: ActivatedRoute,
    private loading: LoadingController,
    private nav: NavController) { }

  fetchFlightLog(event?: any) {
    this.flightLogService.fetch(this.flightLogId).subscribe((results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.flightLog = results;
        if (!this.initialDataLoaded) {
          this.initialDataLoaded = true;
        }
      } else {
        this.nav.navigateBack('/tabs/more/flight-log');
      }

      if (this.loadingIndicator) {
        this.loadingIndicator.dismiss();
      }
    });
  }

  doRefresh(event: any) {
    this.fetchFlightLog(event);
  }

  async ngOnInit() {
    this.loadingIndicator = await this.loading.create({
      message: 'Loading'
    });
    await this.loadingIndicator.present();
    this.fetchFlightLog();
  }

}
