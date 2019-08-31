import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileBackgroundPage } from './profile-background.page';
import { ProfileUpdateBackgroundPage } from '../profile-update-background/profile-update-background.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileBackgroundPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileBackgroundPage, ProfileUpdateBackgroundPage],
  entryComponents: [ProfileUpdateBackgroundPage]
})
export class ProfileBackgroundPageModule {}
