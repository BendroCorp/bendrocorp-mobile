import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  eventId: number = parseInt(this.route.snapshot.paramMap.get('event_id'))
  event: Event;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.eventService.fetchAndClearPassedData();
    console.log(this.event);    
  }

  ionViewWillEnter() {
  }

  ionViewDidLeave() {
  }

}
