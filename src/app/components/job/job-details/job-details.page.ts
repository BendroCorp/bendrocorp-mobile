import { Component, OnInit } from '@angular/core';
import { JobBoardMission } from 'src/app/models/job-board.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { JobBoardService } from 'src/app/services/job-board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeSpan } from 'ng-timespan';
import { ModalController } from '@ionic/angular';
import { CompleteJobPage } from '../complete-job/complete-job.page';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  eventId: number;
  job: JobBoardMission

  constructor(
    private authService: AuthService, 
    private jobBoardService: JobBoardService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) { }

  fetchJob(event?: any) {
    this.job = this.jobBoardService.fetchAndClearPassedData();
    console.log(this.job);
    
    if (!this.job && this.eventId) {
      this.jobBoardService.fetch(this.eventId).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.job = results
        } else {
          this.messageService.alert('Event not properly passed to event detail view!');
        }

        if (event) {
          event.target.complete();
        }
      });
    } else if (this.job && !this.eventId) {
      console.log('Job loaded');
      console.log(this.job);
      
      if (event) {
        event.target.complete();
      }

      return;
    }

    // const error = 'Event not properly passed to event detail view!';
    // console.error(error);
      
    // this.messageService.alert(error);
  }

  async completeJob() {
    if (this.job) {
      this.jobBoardService.setPassData(this.job);
      const modal = await this.modalController.create({
        component: CompleteJobPage
      });
      return await modal.present();
    }
  }

  isExpired() {
    if (this.job && this.job.expires_when) {
      const ts = TimeSpan.Subtract(new Date(), new Date(this.job.expires_when));
      return (ts.totalSeconds < 0) ? true : false;
    } else {
      return false;
    }
  }

  isAcceptor(): boolean {
    if (this.job) {
      return (this.job.on_mission.find(x => x.user_id == this.authService.retrieveUserSession().id)) ? true : false;
    }
  }

  fetchAcceptors(): string {
    if (this.job) {
      if (this.job.on_mission.length > 0) {
        return this.job.on_mission.map(x => x.first_name).join(', ');
      } else {
        return "None";
      }
    }
  }

  async acceptMission()
  {
    const confirmed = await this.messageService.confirmation("Are you sure you want to accept this mission?");
    console.log(confirmed);
    
    if (confirmed === 1) {
      let accepted = this.isAcceptor();
      if (!accepted && (!this.job.on_mission || (this.job.max_acceptors <= this.job.on_mission.length + 1))) {
        this.jobBoardService.accept(this.job.id).subscribe(
          (results) => {
            if (!(results instanceof HttpErrorResponse)) {
              this.job = results
              this.jobBoardService.refreshData()
            }
          }
        )
      } else {
        this.messageService.toast("You have already accepted this mission!")
      }
    }
  }

  async abandonMission()
  {
    const confirmed = await this.messageService.confirmation("Are you sure you want to abandon this mission?");
    if (confirmed === 1) {
      if (this.isAcceptor()) {
        this.jobBoardService.abandon(this.job.id).subscribe(
          (results) => {
            if (!(results instanceof HttpErrorResponse)) {
              this.job = results
              this.jobBoardService.refreshData()
            }
          }
        )
      } else {
        this.messageService.toast("You have not accepted this mission!")
      }
    }
  }

  doRefresh(event: any) {
    this.fetchJob(event);
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('job_id')) {
      this.eventId = parseInt(this.route.snapshot.paramMap.get('job_id'))
    }

    this.fetchJob();
  }

}
