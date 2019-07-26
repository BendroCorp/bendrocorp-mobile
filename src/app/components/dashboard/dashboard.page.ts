import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { UserSessionResponse } from 'src/app/models/user.model';
import { Subscription, interval } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ILNewsStory } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
import { LoadingController } from '@ionic/angular';
import { PushRegistarService } from 'src/app/services/push-registar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
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

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private newsService: NewsService,
    private loading: LoadingController,
    private push: PushRegistarService) { }

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
                this.loadingIndicator.dismiss();
                event.target.complete();
              }
            }

            if (this.newsFetched && this.eventsFetched) {
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
                this.loadingIndicator.dismiss();
                event.target.complete();
              }
            }

            if (this.newsFetched && this.eventsFetched) {
              this.loadingIndicator.dismiss();
            } else {
              console.log(`en n ${this.newsFetched} e ${this.eventsFetched}`);
            }
          }
        }
      }
    );
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
        this.news = results.slice(0, 3);
        this.newsFetched = true;

        if (event) {
          if (this.newsFetched && this.eventsFetched) {
            event.target.complete();
          }
        }

        if (this.newsFetched && this.eventsFetched) {
          this.loadingIndicator.dismiss();
        } else {
          console.log(`n n ${this.newsFetched} e ${this.eventsFetched}`);
        }
      }
    });
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

  doRefresh(event: any) {
    this.fetchEvents(event);
    this.fetchNews(event);
  }

  ionViewWillEnter() {
    // try to register for pushes
    this.push.initPushNotifications();

    if (this.nextEvent) {
      this.showCountdown = true;
    }
  }

  ionViewDidLeave() {
    this.showCountdown = false;
  }

}
