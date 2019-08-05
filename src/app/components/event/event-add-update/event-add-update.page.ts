import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { ModalController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-event-add-update',
  templateUrl: './event-add-update.page.html',
  styleUrls: ['./event-add-update.page.scss'],
})
export class EventAddUpdatePage implements OnInit {
  formAction: string;
  event: Event;
  dataSubmitted: boolean = false;

  // recurrence outlets
  recurWeekly: boolean = false;
  recurMonthly: boolean = false;
  neverRecur: boolean = true;
  recurrenceId: number = 0;

  constructor(
    private eventService: EventService,
    private messageService: MessageService,
    private modalController: ModalController) { }

  addUpdateEvent() {
    if (this.event.name && this.event.description && this.event.start_date && this.event.end_date) {
      console.log(this.event);

      // get the ms times for the event dates
      this.event.start_date_ms = new Date(this.event.start_date).getTime();
      this.event.end_date_ms = new Date(this.event.end_date).getTime();

      // TODO: Only the "Operation" event type is supported from the app. Open it up more :)
      this.event.event_type_id = 1;

      this.dataSubmitted = true;

      if (this.event && this.event.id) {
        this.eventService.update(this.event).subscribe((results) => {
          if (!(results instanceof HttpErrorResponse)) {
            this.eventService.refreshData();
            this.dismiss();
          }
          this.dataSubmitted = false;
        });
      } else {
        this.eventService.create(this.event).subscribe((results) => {
          if (!(results instanceof HttpErrorResponse)) {
            this.eventService.refreshData();
            this.dismiss();
          }
          this.dataSubmitted = false;
        });
      }
    } else {
      this.messageService.alert('Please fill out all required fields!');
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  setRecurrence()
  {
    if (this.recurrenceId === 1) {
      this.event.monthly_recurrence = false;
      this.event.weekly_recurrence = true;
    } else if (this.recurrenceId === 2) {
      this.event.monthly_recurrence = true;
      this.event.weekly_recurrence = false;
    } else {
      this.event.monthly_recurrence = false;
      this.event.weekly_recurrence = false;
    }
  }

  getRecurrence()
  {
    if (this.event) {
      if (this.event.weekly_recurrence && !this.event.monthly_recurrence) {
        this.recurrenceId = 1;
      } else if (!this.event.weekly_recurrence && this.event.monthly_recurrence) {
        this.recurrenceId = 2;
      } else {
        this.recurrenceId = 0;
      }
    }else {
      this.recurrenceId = 0;
    }
  }

  ngOnInit() {
    this.event = this.eventService.fetchAndClearPassedData();
    this.getRecurrence();
    if (this.event && this.event.id) {
      this.formAction = "Update";
    } else {
      this.formAction = "Create";
      this.event = {} as Event;
    }
  }

}
