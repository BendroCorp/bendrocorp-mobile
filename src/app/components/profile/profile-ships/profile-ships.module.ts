import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileShipsPage } from './profile-ships.page';
import { ProfileShipsAddUpdatePage } from '../profile-ships-add-update/profile-ships-add-update.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileShipsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileShipsPage, ProfileShipsAddUpdatePage],
  entryComponents: [ProfileShipsAddUpdatePage]
})
export class ProfileShipsPageModule {}
