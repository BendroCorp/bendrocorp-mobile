import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { UserSessionResponse } from 'src/app/models/user.model';
import { Subscription, interval } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ILNewsStory } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { PushRegistarService } from 'src/app/services/push-registar.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { TimeSpan } from 'ng-timespan';
import { NewsDetailPage } from '../news-detail/news-detail.page';
import { EventDetailsPage } from '../event/event-details/event-details.page';
import { EventDetailsModalPage } from '../event/event-details-modal/event-details-modal.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  nextEvent: Event;
  news: ILNewsStory[] = [];
  events: Event[];
  eventStartedSubscription: Subscription;
  eventsFetched: boolean = false;
  newsFetched: boolean = false;
  showCountdown: boolean;
  showStartCountdown: boolean;
  showEndCountdown: boolean;
  checkerStarted: boolean;
  user: UserSessionResponse;
  loadingIndicator: any;
  initialDataLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private newsService: NewsService,
    private loading: LoadingController,
    private nav: NavController,
    private iab: InAppBrowser,
    private pushRegistar: PushRegistarService,
    private modalController: ModalController) { }

  fetchEvents(event?: any) {
    this.eventsFetched = false;
    this.showStartCountdown = false;
    this.showEndCountdown = false;

    // if this sub exists get rid of it since this method will rebuild it
    if (this.eventStartedSubscription) {
      this.eventStartedSubscription.unsubscribe();
    }

    this.eventService.list().subscribe(
      (results) => {
        if (!(results instanceof HttpErrorResponse)) {
          console.log(results);
          if (results.length > 0) {
            // get the first event
            this.nextEvent = results.slice(0, 1)[0];
            this.events = results.splice(0, 1);

            // set fetched to true?
            this.eventsFetched = true;

            if (event) {
              if (this.newsFetched && this.eventsFetched) {
                if (!this.initialDataLoaded) {
                  this.initialDataLoaded = true;
                }
                this.loadingIndicator.dismiss();
                event.target.complete();
              }
            }

            if (this.newsFetched && this.eventsFetched) {
              if (!this.initialDataLoaded) {
                this.initialDataLoaded = true;
              }
              this.loadingIndicator.dismiss();
            } else {
              console.log(`e n ${this.newsFetched} e ${this.eventsFetched}`);
            }

            // if we found a next event do the work to monitor it
            if (this.nextEvent) {
              this.eventStartedSubscription = interval(500).subscribe(
                () => {
                  // if the start date is less than now
                  const eventStart = new Date(this.nextEvent.start_date);
                  const eventEnd = new Date(this.nextEvent.end_date);

                  const currentToStart = TimeSpan.Subtract(new Date(), eventStart); //new Date().getTime();
                  const currentToEnd = TimeSpan.Subtract(new Date(), eventEnd);

                  // console.log(`Dashboard Event:: STTC: ${currentToStart.totalSeconds}, ETTC: ${currentToEnd.totalSeconds}`);

                  if (currentToStart.totalSeconds > 0 && currentToEnd.totalSeconds > 0) { // event is still upcoming
                    // console.log('Dashboard: Event upcoming!');
                    this.showStartCountdown = true;
                    this.showEndCountdown = false;

                  } else if (currentToStart.totalSeconds <= 0 && currentToEnd.totalSeconds > 0) { // event is happening now
                    // console.log('Dashboard: Event happening now!');
                    this.showStartCountdown = false;
                    this.showEndCountdown = true;
                    // this.eventStartedSubscription.unsubscribe();
                  } else if (currentToStart.totalSeconds <= 0 && currentToEnd.totalSeconds <= 0) { // event has ended and we need to see if there is a new event
                    // console.log('Dashboard: Event expired!');
                    this.showStartCountdown = false;
                    this.showEndCountdown = false;
                    this.nextEvent = null;
                    this.fetchEvents();
                  }
                  this.checkerStarted = true;
                }
              );
            }
          } else {
            this.eventsFetched = true;

            if (event) {
              if (this.newsFetched && this.eventsFetched) {
                if (!this.initialDataLoaded) {
                  this.initialDataLoaded = true;
                }
                this.loadingIndicator.dismiss();
                event.target.complete();
              }
            }

            if (this.newsFetched && this.eventsFetched) {
              if (!this.initialDataLoaded) {
                this.initialDataLoaded = true;
              }
              this.loadingIndicator.dismiss();
            } else {
              console.log(`en n ${this.newsFetched} e ${this.eventsFetched}`);
            }
          }
        }
      }
    );
  }

  openNextEvent() {
    if (this.nextEvent) {
      this.nav.navigateForward(`/tabs/event/details/${this.nextEvent.id}`);
    }
  }

  async openEventModal(event: Event) {
    const modal = await this.modalController.create({
      component: EventDetailsModalPage,
      componentProps: {
        event
      }
    });
    return await modal.present();
  }

  async openNewsModal(newsItem: ILNewsStory) {
    const modal = await this.modalController.create({
      component: NewsDetailPage,
      componentProps: {
        newsItem
      }
    });
    return await modal.present();
  }

  async fetchUser() {
    this.user = this.authService.retrieveUserSession();
    // this.user.avatar
    // this.user.first_name
  }

  fetchNews(event?: any) {
    this.newsFetched = false;
    this.newsService.list().subscribe((results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.news = results.filter(x => x.published).slice(0, 3);
        this.newsFetched = true;

        if (event) {
          if (this.newsFetched && this.eventsFetched) {
            event.target.complete();
          }
        }

        if (this.newsFetched && this.eventsFetched) {
          if (!this.initialDataLoaded) {
            this.initialDataLoaded = true;
          }
          this.loadingIndicator.dismiss();
        } else {
          console.log(`n n ${this.newsFetched} e ${this.eventsFetched}`);
        }
      }
    });
  }

  eventIsStarted(event: Event) {
    const ts = TimeSpan.Subtract(new Date(event.start_date), new Date());
    return (ts.totalSeconds <= 0) ? true : false;
  }

  openDiscord() {
    // Open our private Discord link
    const browser = this.iab.create('https://discord.gg/daeYKRS', '_system');
  }

  async ngOnInit() {

    await this.fetchUser();
    this.loadingIndicator = await this.loading.create({
      message: 'Loading'
    });
    await this.loadingIndicator.present();
    this.fetchEvents();
    this.fetchNews();

    // Init push notifications
    if (this.authService.isLoggedIn()) {
      this.pushRegistar.initPushNotifications();
    }
  }

  ngOnDestroy() {
    if (this.eventStartedSubscription) {
      this.eventStartedSubscription.unsubscribe();
    }
  }

  doRefresh(event: any) {
    this.fetchEvents(event);
    this.fetchNews(event);
  }

  ionViewWillEnter() {
    this.showCountdown = true;
    if (!this.nextEvent) {
      this.fetchEvents();
    }
  }

  ionViewDidLeave() {
    this.showCountdown = false;
  }

}
