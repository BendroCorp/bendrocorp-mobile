import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  pendingApprovals: number = 0;
  approvalSubscription: Subscription;

  constructor(private userService: UserService) {
    this.approvalSubscription = this.userService.approvalsDataRefreshAnnounced$.subscribe(() => {
      this.fetchPendingApprovalCount();
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
  }

}
