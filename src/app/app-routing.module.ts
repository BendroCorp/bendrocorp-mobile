import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuardGuard } from './guards/no-auth-guard.guard';
import { AuthGuardService } from './guards/auth-guard.guard';
import { MemberGuard } from './guards/member.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [MemberGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule', canActivate: [NoAuthGuardGuard] },
  { path: 'job-details', loadChildren: './components/job/job-details/job-details.module#JobDetailsPageModule' },
  { path: 'event-add-update', loadChildren: './components/event/event-add-update/event-add-update.module#EventAddUpdatePageModule' },
  { path: 'certify-event', loadChildren: './components/event/certify-event/certify-event.module#CertifyEventPageModule' },
  { path: 'add-update-job', loadChildren: './components/job/add-update-job/add-update-job.module#AddUpdateJobPageModule' },
  { path: 'complete-job', loadChildren: './components/job/complete-job/complete-job.module#CompleteJobPageModule' },
  // { path: 'flight-log-details', loadChildren: './flight-log/flight-log-details/flight-log-details.module#FlightLogDetailsPageModule' },
  // { path: 'add-update-flight-log', loadChildren: './flight-log/add-update-flight-log/add-update-flight-log.module#AddUpdateFlightLogPageModule' },
  // { path: 'flight-log-details', loadChildren: './components/flight-log/flight-log-details/flight-log-details.module#FlightLogDetailsPageModule' },
  { path: 'add-update-flight-log', loadChildren: './components/flight-log/add-update-flight-log/add-update-flight-log.module#AddUpdateFlightLogPageModule' },
  { path: 'settings', loadChildren: './components/settings/settings.module#SettingsPageModule' },
  { path: 'news-detail', loadChildren: './components/news-detail/news-detail.module#NewsDetailPageModule' },
  { path: 'event-details-modal', loadChildren: './components/event/event-details-modal/event-details-modal.module#EventDetailsModalPageModule' },
  { path: 'profile-update-background', loadChildren: './components/profile/profile-update-background/profile-update-background.module#ProfileUpdateBackgroundPageModule' },
  { path: 'profile-ships-add-update', loadChildren: './components/profile/profile-ships-add-update/profile-ships-add-update.module#ProfileShipsAddUpdatePageModule' },
  { path: 'profile-interview-hints', loadChildren: './components/profile/profile-interview-hints/profile-interview-hints.module#ProfileInterviewHintsPageModule' },
  { path: 'offender', loadChildren: './components/offender/offender.module#OffenderPageModule' },
  { path: 'offender-report', loadChildren: './components/offender/offender-report/offender-report.module#OffenderReportPageModule' },
  { path: 'offender-detail', loadChildren: './components/offender/offender-detail/offender-detail.module#OffenderDetailPageModule' },
  { path: 'add-update-offender-report', loadChildren: './components/offender/add-update-offender-report/add-update-offender-report.module#AddUpdateOffenderReportPageModule' },
  { path: 'offender-report-detail', loadChildren: './components/offender/offender-report-detail/offender-report-detail.module#OffenderReportDetailPageModule' },
  // { path: 'approval', loadChildren: './components/approval/approval.module#ApprovalPageModule' },
  // { path: 'approval-details', loadChildren: './components/approval/approval-details/approval-details.module#ApprovalDetailsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
