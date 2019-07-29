import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { UserSessionResponse } from 'src/app/models/user.model';
import { Subscription, interval } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ILNewsStory } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
import { LoadingController, NavController } from '@ionic/angular';
import { PushRegistarService } from 'src/app/services/push-registar.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

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
    private iab: InAppBrowser) { }

  fetchEvents(event?: any) {
    this.eventsFetched = false;
    this.showCountdown = false;
    this.eventService.list().subscribe(
      (results) => {
        if (!(results instanceof HttpErrorResponse)) {
          console.log(results);
          if (results.length > 0) {
            this.nextEvent = results.slice(0, 1)[0];
            console.log(this.nextEvent);
            this.events = results.splice(0, 1);
            console.log(this.events);

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

            if (this.nextEvent) {
              this.eventStartedSubscription = interval(500).subscribe(
                () => {
                  // if the start date is less than now
                  const eventStart = new Date(this.nextEvent.start_date).getTime();
                  const current = new Date().getTime();
                  if (eventStart > current) {
                    this.showCountdown = true;

                  } else {
                    this.showCountdown = false;
                    this.eventStartedSubscription.unsubscribe();
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

  openDiscord() {
    // https://discord.gg/daeYKRS
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

    if (this.nextEvent) {
      this.showCountdown = true;
    }
  }

  ionViewDidLeave() {
    this.showCountdown = false;
  }

}
