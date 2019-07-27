import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { TimeSpan } from 'ng-timespan';
import { EventAddUpdatePage } from '../event-add-update/event-add-update.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit, OnDestroy {
  isAdmin: boolean = this.authService.hasClaim(19);
  eventId: number = parseInt(this.route.snapshot.paramMap.get('event_id'));
  event: Event;
  eventSubscription: Subscription;
  initialDataLoaded: boolean = false;
  loadingIndicator: any;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
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
            }
          }
        );
      } else {
        console.error(`Provided attendence type ${typeId} out of accepted range!`)
        this.messageService.alert("Something went wrong. Please try again later!")
      }
    }
  }

  async addUpdateEvent() {
    if (this.event) {
      this.eventService.setPassData(this.event);
    }

    const modal = await this.modalController.create({
      component: EventAddUpdatePage
    });
    return await modal.present();
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
    if (!this.event) {
      this.event = this.eventService.fetchAndClearPassedData();
    }

    // condition to call this
    // if we get an event which we want a db refresh
    //
    if ((!(this.event && this.event.id) && this.eventId) || event) {
      this.eventService.fetch(this.eventId).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.event = results;
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
    }
  }

  doRefresh(event: any) {
    this.fetchEvent(event);
  }

  async ngOnInit() {
    this.loadingIndicator = await this.loading.create({
      message: 'Loading'
    });
    await this.loadingIndicator.present();
    this.fetchEvent();
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
  }

  ionViewDidLeave() {
  }

}
