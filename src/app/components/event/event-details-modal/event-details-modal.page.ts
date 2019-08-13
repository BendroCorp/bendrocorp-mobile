import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { EventAddUpdatePage } from '../event-add-update/event-add-update.page';
import { TimeSpan } from 'ng-timespan';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-event-details-modal',
  templateUrl: './event-details-modal.page.html',
  styleUrls: ['./event-details-modal.page.scss'],
})
export class EventDetailsModalPage implements OnInit, OnDestroy {

  isAdmin: boolean = this.authService.hasClaim(19);
  eventId: number = parseInt(this.route.snapshot.paramMap.get('event_id'));
  event: Event;
  eventSubscription: Subscription;
  initialDataLoaded: boolean = false;
  loadingIndicator: any;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private modalController: ModalController,
    private loading: LoadingController
  ) { }

  setAttendance(typeId: number) {
    if (this.event) {
      if (typeId === 1 || typeId === 2) {
        this.eventService.setAttendence(this.event.id, typeId).subscribe(
          (result) => {
            if (!(result instanceof HttpErrorResponse)) {
              if (this.event.attendences.find(x => x.id === result.id)) {
                this.event.attendences[this.event.attendences.findIndex(x => x.id === result.id)] = result;
              } else {
                this.event.attendences.push(result);
              }
              this.eventService.refreshData();
            }
          }
        );
      } else {
        console.error(`Provided attendence type ${typeId} out of accepted range!`);
        this.messageService.alert('Something went wrong. Please try again later!');
      }
    }
  }

  checkCurrentStatus() {
    if (this.event && this.event.attendences) {
      return this.event.attendences.find(x => x.user_id === this.authService.retrieveUserSession().id);
    }
  }

  fetchAttendanceString() {
    if (this.event) {
      if (this.event.attendences && this.event.attendences.filter(x => x.attendence_type_id === 1).length > 0) {
        return this.event.attendences.filter(x => x.attendence_type_id === 1).map(val => val.character.full_name).join(', ');
      } else {
        return 'None';
      }
    }
  }

  isExpired() {
    if (this.event) {
      const ts = TimeSpan.Subtract(new Date(), new Date(this.event.end_date));
      return (ts.totalSeconds < 0) ? true : false;
    } else {
      return false;
    }
  }

  fetchEvent(event?: any) {
    // try to get the event from the service
    if (this.eventId) {
      this.eventService.fetch(this.eventId).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.event = results;
        } else {
          this.router.navigateByUrl('/tabs/event');
          if (this.loadingIndicator) {
            this.loadingIndicator.dismiss();
          }
        }

        if (event) {
          event.target.complete();
        }

        if (!this.initialDataLoaded) {
          this.initialDataLoaded = true;
        }

        if (this.loadingIndicator) {
          this.loadingIndicator.dismiss();
        }
      });
    } else {
      this.messageService.toast('Event not found!');
      this.router.navigateByUrl('/tabs/event');

      if (this.loadingIndicator) {
        this.loadingIndicator.dismiss();
      }
    }
  }

  doRefresh(event: any) {
    this.fetchEvent(event);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async ngOnInit() {
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

}
