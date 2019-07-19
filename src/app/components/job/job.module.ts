import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JobPage } from './job.page';
import { AddUpdateJobPage } from './add-update-job/add-update-job.page';
import { JobDetailsPage } from './job-details/job-details.page';

const routes: Routes = [
  {
    path: '',
    component: JobPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JobPage, AddUpdateJobPage, JobDetailsPage],
  entryComponents: [AddUpdateJobPage, JobDetailsPage]
})
export class JobPageModule {}
