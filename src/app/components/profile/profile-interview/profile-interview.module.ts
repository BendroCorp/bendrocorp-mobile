import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileInterviewPage } from './profile-interview.page';
import { ProfileInterviewHintsPage } from '../profile-interview-hints/profile-interview-hints.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileInterviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileInterviewPage, ProfileInterviewHintsPage],
  entryComponents: [ProfileInterviewHintsPage]
})
export class ProfileInterviewPageModule {}
