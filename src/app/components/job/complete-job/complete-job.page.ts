import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JobBoardService } from 'src/app/services/job-board.service';
import { JobBoardMission, JobBoardMissionCompletionRequest } from 'src/app/models/job-board.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FlightLogService } from 'src/app/services/flight-log.service';
import { FlightLog } from 'src/app/models/flight-log.model';

@Component({
  selector: 'app-complete-job',
  templateUrl: './complete-job.page.html',
  styleUrls: ['./complete-job.page.scss'],
})
export class CompleteJobPage implements OnInit {
  job: JobBoardMission;
  flightLogs: FlightLog[];
  completion:  JobBoardMissionCompletionRequest = {} as JobBoardMissionCompletionRequest;

  constructor(private jobBoardService: JobBoardService, private flightLogService: FlightLogService, private modalController: ModalController) { }

  doComplete() {
    if (this.completion.mission_id && this.completion.flight_log_id && this.completion.completion_message) {
      this.jobBoardService.complete(this.completion).subscribe((results => {
        if (!(results instanceof HttpErrorResponse)) {
          this.dismiss();
        }
      }));
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
    this.flightLogService.list().subscribe((results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.job = this.jobBoardService.fetchAndClearPassedData();
        this.flightLogs = results;
      }
    });
  }

}
