import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { DashboardPage } from '../components/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'tab1',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: '../tab1/tab1.module#Tab1PageModule'
      //     }
      //   ]
      // },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: '../components/dashboard/dashboard.module#DashboardPageModule'
          }
        ]
      },
      {
        path: 'event',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event.module#EventPageModule'
          }
        ]
      },
      {
        path: 'event/add-update',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event-add-update/event-add-update.module#EventAddUpdatePageModule'
          }
        ]
      },
      {
        path: 'event/details',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event-details/event-details.module#EventDetailsPageModule'
          }
        ]
      },
      {
        path: 'event/details/:event_id',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event-details/event-details.module#EventDetailsPageModule'
          }
        ]
      },
      {
        path: 'job',
        children: [
          {
            path: '',
            loadChildren: '../components/job/job.module#JobPageModule'
          }
        ]
      },
      {
        path: 'job/details',
        children: [
          {
            path: '',
            loadChildren: '../components/job/job-details/job-details.module#JobDetailsPageModule'
          }
        ]
      },
      {
        path: 'job/details/:job_id',
        children: [
          {
            path: '',
            loadChildren: '../components/job/job-details/job-details.module#JobDetailsPageModule'
          }
        ]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: '../components/more-menu/more-menu.module#MoreMenuPageModule'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
