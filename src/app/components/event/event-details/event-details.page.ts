import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { TimeSpan } from 'ng-timespan';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  eventId: number = parseInt(this.route.snapshot.paramMap.get('event_id'))
  event: Event;

  constructor(
    private eventService: EventService, 
    private route: ActivatedRoute, 
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  setAttendence(typeId:number)
  {
    if (this.event) {
      if (typeId === 1 || typeId === 2) {
        this.eventService.setAttendence(this.event.id, typeId).subscribe(
          (result) => 
          {
            if (!(result instanceof HttpErrorResponse)) {
              if (this.event.attendences.find(x => x.id == result.id)) {
                this.event.attendences[this.event.attendences.findIndex(x => x.id == result.id)] = result
              } else {
                this.event.attendences.push(result)
              }
            }
          }
        )
      }else{
        console.error(`Provided attendence type ${typeId} out of accepted range!`)
        this.messageService.alert("Something went wrong. Please try again later!")
      }
    }
  }

  checkCurrentStatus()
  {
    return this.event.attendences.find(x => x.user_id == this.authService.retrieveUserSession().id)
  }

  fetchAttendenceString()
  {
    if (this.event) {
      if (this.event.attendences && this.event.attendences.filter(x => x.attendence_type_id == 1).length > 0) {
        return this.event.attendences.filter(x => x.attendence_type_id == 1).map(val => val.character.full_name).join(', ');
      } else {
        return 'None';
      }
    }
  }

  isExpired() {
    if (this.event) {
      const ts = TimeSpan.Subtract(new Date(), new Date(this.event.end_date));
      return (ts.totalSeconds < 0) ? true : false;
    }
  }

  ngOnInit() {
    this.event = this.eventService.fetchAndClearPassedData();
    if (!this.event && this.eventId) {
      this.messageService.alert('event didnt load');
      this.eventService.fetch(this.eventId).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.event = results
        } else {
          this.messageService.alert('Event not properly passed to event detail view!');
        }
      });
    } 
  }

  ionViewWillEnter() {
  }

  ionViewDidLeave() {
  }

}
