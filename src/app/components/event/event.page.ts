import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Event } from 'src/app/models/event.model';
import { Router } from '@angular/router';
import { EventDetailsPage } from './event-details/event-details.page';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { EventAddUpdatePage } from './event-add-update/event-add-update.page';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { CertifyEventPage } from './certify-event/certify-event.page';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy {
  detailsNav = EventDetailsPage;
  events: Event[] = [];
  expiredEvents: Event[] = [];
  isAdmin: boolean = this.authService.hasClaim(19);
  eventSubscription: Subscription;
  initialDataLoaded: boolean = false;
  loadingIndicator: any;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private router: Router,
    private nav: NavController,
    private modalController: ModalController,
    private messageService: MessageService,
    private loading: LoadingController) {
    this.eventSubscription = this.eventService.dataRefreshAnnounced$.subscribe(() => {
      this.fetchEvents();
      if (this.isAdmin) {
        this.fetchExpiredEvents();
      }
    });
  }

  doRefresh(event: any) {
    this.fetchEvents(event);
    if (this.isAdmin) {
      this.fetchExpiredEvents();
    }
  }

  fetchEvents(event?: any) {
    this.eventService.list().subscribe(async (results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.events = results;
      }

      if (!this.initialDataLoaded && !this.isAdmin) {
        this.initialDataLoaded = true;
        await this.loading.dismiss();
      }

      if (event) {
        event.target.complete();
      }
    });
  }

  async fetchExpiredEvents(event?: any) {
    this.eventService.list_expired(10).subscribe(async (results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.expiredEvents = results;
      }

      if (!this.initialDataLoaded && this.isAdmin) {
        this.initialDataLoaded = true;
        await this.loading.dismiss();
      }

      if (event) {
        event.target.complete();
      }
    });
  }

  fetchAttendenceString(event: Event) {
    return event.attendences.filter(x => x.attendence_type_id === 1).map(val => val.character.full_name).join(', ');
  }

  async certifyEvent(event: Event) {
    this.eventService.setPassData(event);
    const modal = await this.modalController.create({
      component: CertifyEventPage
    });
    return await modal.present();
  }

  async addUpdateEvent(event?: Event) {
    if (event) {
      this.eventService.setPassData(event);
    }

    const modal = await this.modalController.create({
      component: EventAddUpdatePage
    });
    return await modal.present();
  }

  async publishEvent(event: Event) {
    if (await this.messageService.confirmation('Are you sure that you want publish this event? All current members will be notified.') === 1) {
      this.eventService.publish(event).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.messageService.toast('Event published!');
          this.eventService.refreshData();
        }
      });
    }
  }

  archiveEvent(event: Event) {
    this.messageService.toast('Events cannot be deleted yet!');
  }

  openEvent(event: Event) {
    this.eventService.setPassData(event);
    this.nav.navigateForward(`/tabs/event/details/${event.id}`);
  }

  async ngOnInit() {
    this.loadingIndicator = await this.loading.create({
      message: 'Loading'
    });
    await this.loadingIndicator.present();
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.fetchEvents();
    if (this.isAdmin) {
      this.fetchExpiredEvents();
    }
  }

  ionViewDidLeave() {
  }

}
