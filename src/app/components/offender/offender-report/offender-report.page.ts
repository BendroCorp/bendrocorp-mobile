import { Component, OnInit } from '@angular/core';
import { OffenderReport } from 'src/app/models/offender.model';
import { OffenderService } from 'src/app/services/offender.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offender-report',
  templateUrl: './offender-report.page.html',
  styleUrls: ['./offender-report.page.scss'],
})
export class OffenderReportPage implements OnInit {
  reports: OffenderReport[];
  reportListKind: 'mine'|'unanswered'|'all';

  constructor(
    private offenderService: OffenderService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private navController: NavController
  ) { }

  openReport(report: OffenderReport) {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        report
      }
    };

    this.router.navigate(['report-detail'], navigationExtras);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state);

        this.reports = this.router.getCurrentNavigation().extras.state.reports;
        this.reports.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        console.log(this.reports);
        // if (this.report && this.report.id) {
        //   // this.fetchOffender();
        // } else {
        //   // this.router.navigateByUrl('/more/profile');
        //   this.messageService.alert('Error: Offender report object not properly shared!');
        //   this.navController.pop();
        // }
      }
    });
  }

}
