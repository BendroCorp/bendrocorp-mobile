import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FlightLogPage } from './flight-log.page';
import { AddUpdateFlightLogPage } from './add-update-flight-log/add-update-flight-log.page';

const routes: Routes = [
  {
    path: '',
    component: FlightLogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FlightLogPage, AddUpdateFlightLogPage],
  entryComponents: [AddUpdateFlightLogPage]
})
export class FlightLogPageModule {}
