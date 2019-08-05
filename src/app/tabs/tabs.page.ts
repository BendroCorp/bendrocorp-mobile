import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription, Subject } from 'rxjs';
import { EventService } from '../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventAttendence } from '../models/event.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  pendingApprovals: number = 0;
  unansweredEventCount: number = 0;
  approvalSubscription: Subscription;
  eventSubscription: Subscription;

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private authService: AuthService
  ) {
    this.approvalSubscription = this.userService.approvalsDataRefreshAnnounced$.subscribe(() => {
      this.fetchPendingApprovalCount();
    });

    this.eventSubscription = this.eventService.dataRefreshAnnounced$.subscribe(() => {
      this.fetchUnAnsweredEventCount();
    });
  }

  fetchUnAnsweredEventCount() {
    this.eventService.list().subscribe((results) => {
      if (!(results instanceof HttpErrorResponse)) {
        const attends = results.map(x => x.attendences);
        const merged = [].concat.apply([], attends) as EventAttendence[];
        const userAttending = merged.filter(x => x.user_id === this.authService.retrieveUserSession().id);
        this.unansweredEventCount = results.length - userAttending.length;
      }
    });
  }

  fetchPendingApprovalCount() {
    this.userService.fetchPendingApprovalsCount().subscribe((result) => {
      this.pendingApprovals = result;
    });
  }

  ngOnInit(): void {
    this.fetchPendingApprovalCount();
  }
  ngOnDestroy(): void {
    if (this.approvalSubscription) {
      this.approvalSubscription.unsubscribe();
    }

    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

}
