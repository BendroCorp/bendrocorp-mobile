import { Component, OnInit, OnDestroy } from '@angular/core';
import { Offender } from 'src/app/models/offender.model';
import { OffenderService } from 'src/app/services/offender.service';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-offender-detail',
  templateUrl: './offender-detail.page.html',
  styleUrls: ['./offender-detail.page.scss'],
})
export class OffenderDetailPage implements OnInit, OnDestroy {
  offender: Offender;
  offenderSubscription: Subscription;
  offenderInfractionHistogram: { };

  constructor(
    private messageService: MessageService,
    private navController: NavController,
    private offenderService: OffenderService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.offenderSubscription = this.offenderService.dataRefreshAnnounced$.subscribe(() => {
      this.fetchOffender();
    });
   }

  fetchOffender() {
    if (this.offender && this.offender.id) {
      this. offenderService.fetch_offender(this.offender.id).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.offender = results;

          // histogram the infractions

          let infractionsHistogram = { };
          this.offender.offender_reports
          .map(x => x.infractions)
          .reduce((acc, val) => acc.concat(val), [])
          .map(x => x.title).forEach((title) => {
            if (infractionsHistogram[title]) {
              infractionsHistogram[title] += 1;
            } else {
              infractionsHistogram[title] = 1;
            }
          });

          this.offenderInfractionHistogram = infractionsHistogram;
        }
      });
    }
  }

  fetchOrgAssociatesString() {
    if (this.offender && this.offender.id && this.offender.offender_report_org) {
      const filtered = this.offender.offender_report_org.known_offenders.filter(x => x.id !== this.offender.id).map(x => x.offender_handle);
      return (filtered.length > 0) ? filtered.join(', ') : 'None';
    } else {
      return 'None';
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state);

        this.offender = this.router.getCurrentNavigation().extras.state.offender;
        console.log(this.offender);
        if (this.offender && this.offender.id) {
          this.fetchOffender();
        } else {
          // this.router.navigateByUrl('/more/profile');
          this.messageService.alert('Error: Offender object not properly shared!');
          this.navController.pop();
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.offenderSubscription) {
      this.offenderSubscription.unsubscribe();
    }
  }

}
