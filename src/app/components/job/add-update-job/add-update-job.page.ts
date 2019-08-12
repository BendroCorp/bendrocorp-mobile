import { Component, OnInit } from '@angular/core';
import { JobBoardService } from 'src/app/services/job-board.service';
import { JobBoardMission, JobBoardMissionCompletionCriteria } from 'src/app/models/job-board.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-update-job',
  templateUrl: './add-update-job.page.html',
  styleUrls: ['./add-update-job.page.scss'],
})
export class AddUpdateJobPage implements OnInit {
  formAction: string;
  job: JobBoardMission;
  criteria: JobBoardMissionCompletionCriteria[];
  dataSubmitted: boolean;

  constructor(private jobBoardService: JobBoardService, private modalController: ModalController) { }

  addUpdateJob() {
    if (this.job && this.job.id) {
      this.jobBoardService.update(this.job).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.jobBoardService.refreshData();
          this.dismiss();
        }
      });
    } else {
      this.jobBoardService.create(this.job).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.jobBoardService.refreshData();
          this.dismiss();
        }
      });
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  fetchCriteria() {
    this.jobBoardService.list_criteria().subscribe((results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.criteria = results;
        console.log(results);
      }
    });
  }

  ngOnInit() {
    this.fetchCriteria();

    this.job = this.jobBoardService.fetchAndClearPassedData();
    if (this.job && this.job.id) {      
      this.formAction = "Update";
    } else {
      this.formAction = "Create";
      this.job = {} as JobBoardMission;
    }
  }

}
