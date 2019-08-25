import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { DashboardPage } from '../components/dashboard/dashboard.page';
import { MemberGuard } from '../guards/member.guard';

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
        canActivate: [MemberGuard]
      },
      {
        path: 'event',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event.module#EventPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'event/add-update',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event-add-update/event-add-update.module#EventAddUpdatePageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'event/details',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event-details/event-details.module#EventDetailsPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'event/details/:event_id',
        children: [
          {
            path: '',
            loadChildren: '../components/event/event-details/event-details.module#EventDetailsPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'job',
        children: [
          {
            path: '',
            loadChildren: '../components/job/job.module#JobPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'job/details',
        children: [
          {
            path: '',
            loadChildren: '../components/job/job-details/job-details.module#JobDetailsPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'job/details/:job_id',
        children: [
          {
            path: '',
            loadChildren: '../components/job/job-details/job-details.module#JobDetailsPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'job/add-update',
        children: [
          {
            path: '',
            loadChildren: '../components/job/add-update-job/add-update-job.module#AddUpdateJobPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: '../components/more-menu/more-menu.module#MoreMenuPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/profile',
        children: [
          {
            path: '',
            loadChildren: '../components/profile/profile.module#ProfilePageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/profile/profile-details',
        children: [
          {
            path: '',
            loadChildren: '../components/profile/profile-details/profile-details.module#ProfileDetailsPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/profile/profile-details/profile-background',
        children: [
          {
            path: '',
            loadChildren: '../components/profile/profile-background/profile-background.module#ProfileBackgroundPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/profile/profile-details/profile-service-record',
        children: [
          {
            path: '',
            loadChildren: '../components/profile/profile-service-record/profile-service-record.module#ProfileServiceRecordPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/profile/profile-details/profile-ships',
        children: [
          {
            path: '',
            loadChildren: '../components/profile/profile-ships/profile-ships.module#ProfileShipsPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/profile/profile-details/profile-application',
        children: [
          {
            path: '',
            loadChildren: '../components/profile/profile-application/profile-application.module#ProfileApplicationPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/profile/profile-details/profile-interview',
        children: [
          {
            path: '',
            loadChildren: '../components/profile/profile-interview/profile-interview.module#ProfileInterviewPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/approval',
        children: [
          {
            path: '',
            loadChildren: '../components/approval/approval.module#ApprovalPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/approval/details/:approval_id',
        children: [
          {
            path: '',
            loadChildren: '../components/approval/approval-details/approval-details.module#ApprovalDetailsPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/flight-log',
        children: [
          {
            path: '',
            loadChildren: '../components/flight-log/flight-log.module#FlightLogPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/flight-log/add-update',
        children: [
          {
            path: '',
            loadChildren: '../components/flight-log/add-update-flight-log/add-update-flight-log.module#AddUpdateFlightLogPageModule'
          }
        ],
        canActivate: [MemberGuard]
      },
      {
        path: 'more/flight-log/details/:flight_log_id',
        children: [
          {
            path: '',
            loadChildren: '../components/flight-log/flight-log-details/flight-log-details.module#FlightLogDetailsPageModule'
          }
        ],
        canActivate: [MemberGuard]
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
