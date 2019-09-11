import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileServiceRecordPage } from './profile-service-record.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileServiceRecordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileServiceRecordPage]
})
export class ProfileServiceRecordPageModule {}
