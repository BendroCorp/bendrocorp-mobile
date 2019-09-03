import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OffenderReportDetailPage } from './offender-report-detail.page';
import { AddUpdateOffenderReportPage } from '../add-update-offender-report/add-update-offender-report.page';

const routes: Routes = [
  {
    path: '',
    component: OffenderReportDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OffenderReportDetailPage]
})
export class OffenderReportDetailPageModule {}
