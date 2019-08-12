import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { CountdownChartComponent } from './countdown-chart/countdown-chart.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NewsDetailPage } from '../news-detail/news-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage, CountdownChartComponent, NewsDetailPage],
  providers: [InAppBrowser],
  entryComponents: [NewsDetailPage]
})
export class DashboardPageModule {}
