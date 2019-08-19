import { Injectable, OnDestroy } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';
import { EventService } from './event.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventAttendence } from '../models/event.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppBadgeService implements OnDestroy {
  // https://ionicframework.com/docs/native/badge
  private approvalSubscription: Subscription;
  private eventSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private userService: UserService,
    private badge: Badge) {
      if (this.authService.isLoggedIn()) {
        // get the inital value here
        this.fetchBadgeCount();

        this.eventSubscription = this.eventService.dataRefreshAnnounced$.subscribe(() => {
          this.fetchBadgeCount();
        });

        this.approvalSubscription = this.userService.approvalsDataRefreshAnnounced$.subscribe(() => {
          this.fetchBadgeCount();
        });
      } else {
        this.badge.clear();
      }
    }

    /**
     * Tally the total number of badgable items and set the app badge
     */
    fetchBadgeCount() {
      // get the events
      if (this.authService.isLoggedIn()) {
        this.eventService.list().subscribe((eventsList) => {
          if (!(eventsList instanceof HttpErrorResponse)) {
            // get the attendence arrays from all of the events
            const attends = eventsList.map(x => x.attendences);
            // flatten the array of arrays to a single array
            const merged = [].concat.apply([], attends) as EventAttendence[];
            // filter for the total number of events the authorized user is ATTENDING
            const userAttending = merged.filter(x => x.user_id === this.authService.retrieveUserSession().id);
            // subtract the number of events that the user is attending from the total number of upcoming events
            const unansweredEvents = eventsList.length - userAttending.length;

            // fetch the pending approvals count
            this.userService.fetchPendingApprovalsCount().subscribe((pendingApprovalCount) => {
              // add them together and set the badge
              const badgeCount = unansweredEvents + pendingApprovalCount;
              if (badgeCount > 0) {
                this.badge.set(badgeCount);
              } else {
                this.badge.clear();
              }
            });
          }
        });
      } else {
        this.badge.clear();
      }
    }

    ngOnDestroy() {
      if (this.eventSubscription) {
        this.eventSubscription.unsubscribe();
      }

      if (this.approvalSubscription) {
        this.approvalSubscription.unsubscribe();
      }
    }
}
