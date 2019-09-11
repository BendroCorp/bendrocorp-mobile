import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileInterviewHintsPage } from './profile-interview-hints.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileInterviewHintsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ProfileInterviewHintsPageModule {}
