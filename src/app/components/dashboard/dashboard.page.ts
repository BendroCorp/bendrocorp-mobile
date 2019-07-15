import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { UserSessionResponse } from 'src/app/models/user.model';
import { Subscription, interval } from 'rxjs';
import { Event }  from 'src/app/models/event.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  nextEvent: Event;
  events: Event[];
  eventStartedSubscription: Subscription;
  showCountdown: boolean;
  checkerStarted: boolean;
  user: UserSessionResponse;

  constructor(private authService: AuthService, private eventService: EventService) { }

  fetchEvents()
  {
    this.eventService.list().subscribe(
      (results) => {
        if (!(results instanceof HttpErrorResponse)) {
          console.log(results);
          if (results.length > 0) {
            this.nextEvent = results.slice(0,1)[0]
            console.log(this.nextEvent)            
            this.events = results.splice(0,1)
            console.log(this.events)
            
            if (this.nextEvent) {
              this.eventStartedSubscription = interval(500).subscribe(
                () => {
                  
                  // if the start date is less than now
                  let eventStart = new Date(this.nextEvent.start_date).getTime()
                  let current = new Date().getTime()
                  if (eventStart > current) {
                    this.showCountdown = true
                    
                  }else{
                    this.showCountdown = false
                    this.eventStartedSubscription.unsubscribe()
                  }
                  this.checkerStarted = true
                }
              )
            }
          }
        }
      }
    )
  }  

  async fetchUser() {
    this.user = this.authService.retrieveUserSession();
    // this.user.avatar
    // this.user.first_name
  }

  async ngOnInit() {
    await this.fetchUser();
    this.fetchEvents();
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
