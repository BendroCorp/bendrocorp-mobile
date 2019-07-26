import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FlightLogDetailsPage } from './flight-log-details.page';

const routes: Routes = [
  {
    path: '',
    component: FlightLogDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FlightLogDetailsPage],
  providers: []
})
export class FlightLogDetailsPageModule {}
