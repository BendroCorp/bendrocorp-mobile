import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guards/auth-guard.guard';
import { NoAuthGuardGuard } from './guards/no-auth-guard.guard';
import { MemberGuard } from './guards/member.guard'
import { MessageService } from './services/message.service';
import { EventService } from './services/event.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { AuthInterceptor } from './auth-interceptor';
import { JobBoardService } from './services/job-board.service';
import { JobsService } from './services/job.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    Dialogs,
    MessageService,
    JobBoardService,
    JobsService,
    EventService,
    AuthService,
    AuthGuardService,
    NoAuthGuardGuard,
    MemberGuard,
    StatusBar,
    SplashScreen,
    Globals,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
