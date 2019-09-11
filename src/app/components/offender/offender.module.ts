import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OffenderPage } from './offender.page';
import { AddUpdateOffenderReportPage } from './add-update-offender-report/add-update-offender-report.page';

const routes: Routes = [
  {
    path: '',
    component: OffenderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OffenderPage]
})
export class OffenderPageModule {}
