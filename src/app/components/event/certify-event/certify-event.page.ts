import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { MessageService } from 'src/app/services/message.service';
import { EventAttendence, AttendenceType, Event } from 'src/app/models/event.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-certify-event',
  templateUrl: './certify-event.page.html',
  styleUrls: ['./certify-event.page.scss'],
})
export class CertifyEventPage implements OnInit {
  event: Event = this.eventService.fetchAndClearPassedData();
  attendences: EventAttendence[];
  attendenceTypes: AttendenceType[];
  debriefingText: string;
  initialDataLoaded: boolean = false;
  attendenceSubmitting: boolean = false;
  certificationPassed: boolean = false;
  loadingIndicator: any;

  constructor(
    private modalController: ModalController, 
    private eventService: EventService, 
    private messageService: MessageService,
    private loading: LoadingController) { }

  async submitForCertification() {
    if (await this.messageService.confirmation('Are you sure you want to vertify this event?') === 1) {
      if (this.event) {
        this.attendenceSubmitting = true;
        this.eventService.certification(this.event.id, this.attendences, this.debriefingText).subscribe(
          (results) =>
          {
            this.attendenceSubmitting = false;
            if (!(results instanceof HttpErrorResponse)) {
              this.eventService.refreshData();
              this.certificationPassed = true;
              this.dismiss();
            }
          }
        );
      }
    }
  }

  async fetchAttendences()
  {
    this.eventService.startCertification(this.event).subscribe(
      async (results) =>
      {
        if (!(results instanceof HttpErrorResponse)) {
          this.attendences = results.sort((a,b) => {
            return ('' + a.character.full_name).localeCompare(b.character.full_name);
          })
          this.initialDataLoaded = true;
          await this.loadingIndicator.dismiss();
        }
      }
    )
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async ngOnInit() {
    this.loadingIndicator = await this.loading.create({
      message: 'Loading'
    });
    await this.loadingIndicator.present();

    this.eventService.list_attendence_types().subscribe(
      (results) =>
      {
        if (!(results instanceof HttpErrorResponse)) {
          this.attendenceTypes = results
          this.fetchAttendences();
        }
      }
    )
  }

}
