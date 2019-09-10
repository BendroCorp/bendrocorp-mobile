import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RequestsService } from 'src/app/services/requests.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyApproval } from 'src/app/models/approval.model';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
})
export class ApprovalPage implements OnInit {
  myApprovals: MyApproval[] = [];
  dataLoadSkip: number = 0;
  dataLoadTake: number = 15;
  baseIncrease: number = 15;
  totalApprovalCount: number;
  initialDataLoaded: boolean;
  loadingIndicator: any;
  currentUserId: number = this.authService.retrieveUserSession().id;

  userServiceSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private requestService: RequestsService,
    private nav: NavController,
    private loading: LoadingController) {
      this.userServiceSubscription = this.userService.approvalsDataRefreshAnnounced$.subscribe(() => {
        this.fetchApprovalRange(this.dataLoadTake, this.dataLoadSkip);
      });
    }

  loadData(event) {
    // do the increases
    this.dataLoadSkip = this.dataLoadTake + this.dataLoadSkip; // skip the previous number that we took
    this.dataLoadTake = this.dataLoadTake + this.baseIncrease;

    console.log(event);
    console.log(`Take: ${this.dataLoadTake}, Skip: ${this.dataLoadSkip}`);

    // fetch
    this.fetchApprovalRange(this.dataLoadTake, this.dataLoadSkip, event);
  }

  fetchApprovalRange(count: number, skip?: number, event?: any) {
    this.requestService.list_approvals(count, skip).subscribe(async (results) => {
      if (!(results instanceof HttpErrorResponse)) {
        // hmmm...
        this.myApprovals = this.myApprovals.concat(results);
      }

      if (!this.initialDataLoaded) {
        this.initialDataLoaded = true;
        await this.loadingIndicator.dismiss();
      }

      if (event) {
        event.target.complete();

        if (this.myApprovals.length === this.totalApprovalCount) {
          event.target.disabled = true;
        }
      }
    });
  }

  openEvent(my_approval: MyApproval) {
    this.nav.navigateForward(`/tabs/event/details/${my_approval.id}`);
  }

  doRefresh(event: any) {
    // reset everything
    this.dataLoadSkip = 0;
    this.dataLoadTake = 15;
    this.baseIncrease = 15;

    // refresh data
    this.requestService.list_approvals(15).subscribe((results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.myApprovals = results;
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

    this.userService.fetchTotalApprovalCount().subscribe((results) => {
      if (!isNaN(results)) {
        this.totalApprovalCount = results;

        // initial data load
        this.fetchApprovalRange(this.dataLoadTake);
      }
    });
  }

}
