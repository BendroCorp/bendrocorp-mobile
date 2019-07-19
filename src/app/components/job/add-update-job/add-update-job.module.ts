import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddUpdateJobPage } from './add-update-job.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateJobPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddUpdateJobPage]
})
export class AddUpdateJobPageModule {}
