import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuardGuard } from './guards/no-auth-guard.guard';
import { AuthGuardService } from './guards/auth-guard.guard';
import { MemberGuard } from './guards/member.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuardService, MemberGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule', canActivate: [NoAuthGuardGuard] },
  { path: 'job-details', loadChildren: './components/job/job-details/job-details.module#JobDetailsPageModule' },
  { path: 'event-add-update', loadChildren: './components/event/event-add-update/event-add-update.module#EventAddUpdatePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
