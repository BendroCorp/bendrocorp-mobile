import { NgModule, ChangeDetectorRef, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, IonNav } from '@ionic/angular';

import { MoreMenuPage } from './more-menu.page';
import { AuthGuardService } from 'src/app/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: MoreMenuPage, 
    children:[
      // {
      //   path: 'approval',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: '../../components/approval/approval.module#ApprovalPageModule'
      //     }
      //   ]
      // },
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MoreMenuPage],
  providers: []
})
export class MoreMenuPageModule {}
