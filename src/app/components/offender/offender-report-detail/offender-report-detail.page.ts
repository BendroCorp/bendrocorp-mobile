import { Component, OnInit } from '@angular/core';
import { OffenderReport } from 'src/app/models/offender.model';
import { OffenderService } from 'src/app/services/offender.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-offender-report-detail',
  templateUrl: './offender-report-detail.page.html',
  styleUrls: ['./offender-report-detail.page.scss'],
})
export class OffenderReportDetailPage implements OnInit {
  report: OffenderReport;
  isAdmin: boolean = this.authService.hasClaim(16);
  canEdit: boolean;

  constructor(
    private offenderService: OffenderService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state);

        this.report = this.router.getCurrentNavigation().extras.state.report;
        console.log(this.report);
        if ((this.report.created_by_id === this.authService.retrieveUserSession().id && !this.report.submitted_for_approval && !this.report.report_approved) || this.isAdmin) {
          this.canEdit = true;
        }
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
