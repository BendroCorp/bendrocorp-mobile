import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JobDetailsPage } from './job-details.page';
import { CompleteJobPage } from '../complete-job/complete-job.page';

const routes: Routes = [
  {
    path: '',
    component: JobDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JobDetailsPage, CompleteJobPage],
  entryComponents: [CompleteJobPage]
})
export class JobDetailsPageModule {}
