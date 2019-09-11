import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobsService } from 'src/app/services/job.service';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
import { JobBoardMission } from 'src/app/models/job-board.model';
import { JobBoardService } from 'src/app/services/job-board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AddUpdateJobPage } from './add-update-job/add-update-job.page';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit, OnDestroy {
  //
  jobs: JobBoardMission[] = [];
  jobSubscription: Subscription;

  //
  isAdmin: boolean = this.authService.hasClaim(28);
  initialDataLoad: boolean;

  //
  loadingIndicator: any;

  constructor(
    private jobBoardService: JobBoardService, 
    private authService: AuthService,
    private nav: NavController, 
    private modalController: ModalController,
    private messageService: MessageService,
    private loading: LoadingController) { 
      this.jobSubscription = this.jobBoardService.dataRefreshAnnounced$.subscribe(() => {
        this.fetchJobs();
      });
    }

  doRefresh(event: any) {
    this.fetchJobs(event);
  }

  openJob(job: JobBoardMission) {
    try {
      this.jobBoardService.setPassData(job);
      this.nav.navigateForward(`/tabs/job/details/${job.id}`)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addUpdateJob(passedJob?: JobBoardMission) {
    console.log(passedJob);
    const modal = await this.modalController.create({
      component: AddUpdateJobPage,
      componentProps: {
        job: passedJob
      }
    });
    return await modal.present();
  }

  fetchJobs(event?: any) {
    this.jobBoardService.list().subscribe(async (results) => {
      if (!(results instanceof HttpErrorResponse)) {
        if (this.isAdmin) {
          this.jobs = results;
        } else {
          this.jobs = results.filter(x => x.mission_status_id < 3);
        }

        this.initialDataLoad = true;
        await this.loadingIndicator.dismiss();
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  async archiveJob(job: JobBoardMission) {
    if (job && job.id) {
      const result = await this.messageService.confirmation(`Are you sure you want to archive '${job.title}'?`);
      console.log(result);
      console.error('Archive not fully implemented! Do that :)');
    }
  }

  ionViewWillEnter() {
    this.fetchJobs();
  }

  ionViewDidLeave() {
  }

  async ngOnInit() {
    this.loadingIndicator = await this.loading.create({
      message: 'Loading'
    });
    await this.loadingIndicator.present();

    this.fetchJobs();
  }

  ngOnDestroy() {
    if (this.jobSubscription) {
      this.jobSubscription.unsubscribe();
    }
  }

}
