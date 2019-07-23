import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventDetailsPage } from './event-details.page';
import { EventAddUpdatePage } from '../event-add-update/event-add-update.page';
import { EventAddUpdatePageModule } from '../event-add-update/event-add-update.module';

const routes: Routes = [
  {
    path: '',
    component: EventDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventDetailsPage],
  entryComponents: []
})
export class EventDetailsPageModule {}
