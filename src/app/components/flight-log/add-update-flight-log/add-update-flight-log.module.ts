import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddUpdateFlightLogPage } from './add-update-flight-log.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateFlightLogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddUpdateFlightLogPage]
})
export class AddUpdateFlightLogPageModule {}
