import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, NavParams, NavController } from '@ionic/angular';

import { EventPage } from './event.page';
import { EventAddUpdatePage } from './event-add-update/event-add-update.page';
import { CertifyEventPage } from './certify-event/certify-event.page';

const routes: Routes = [
  {
    path: '',
    component: EventPage,
    children: [
      // {
      //   path: 'details',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: './event-details/event-details.module#EventDetailsPageModule'
      //     }
      //   ]
      // },
      // {
      //   path: 'details/:event_id',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: './event-details/event-details.module#EventDetailsPageModule'
      //     }
      //   ]
      // },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[NavController],
  declarations: [EventPage, EventAddUpdatePage, CertifyEventPage],
  entryComponents: [EventAddUpdatePage, CertifyEventPage]
})
export class EventPageModule {}
