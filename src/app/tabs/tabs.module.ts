import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { AddUpdateOffenderReportPage } from '../components/offender/add-update-offender-report/add-update-offender-report.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage, AddUpdateOffenderReportPage],
  entryComponents: [AddUpdateOffenderReportPage]
})
export class TabsPageModule {}
