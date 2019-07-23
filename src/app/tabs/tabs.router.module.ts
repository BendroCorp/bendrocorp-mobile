import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { DashboardPage } from '../components/dashboard/dashboard.page';
import { AuthGuardService } from '../guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: '../components/dashboard/dashboard.module#DashboardPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'event',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event.module#EventPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'event/add-update',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event-add-update/event-add-update.module#EventAddUpdatePageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'event/details',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event-details/event-details.module#EventDetailsPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'event/details/:event_id',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event-details/event-details.module#EventDetailsPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'job',
        children: [
          {
            path: '',
            loadChildren: '../components/job/job.module#JobPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'job/details',
        children: [
          {
            path: '',
            loadChildren: '../components/job/job-details/job-details.module#JobDetailsPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'job/details/:job_id',
        children: [
          {
            path: '',
            loadChildren: '../components/job/job-details/job-details.module#JobDetailsPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'job/add-update',
        children: [
          {
            path: '',
            loadChildren: '../components/job/add-update-job/add-update-job.module#AddUpdateJobPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: '../components/more-menu/more-menu.module#MoreMenuPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'more/approval',
        children: [
          {
            path: '',
            loadChildren: '../components/approval/approval.module#ApprovalPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'more/approval/details/:approval_id',
        children: [
          {
            path: '',
            loadChildren: '../components/approval/approval-details/approval-details.module#ApprovalDetailsPageModule'
          }
        ],
        canActivate: [AuthGuardService]
      },
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
