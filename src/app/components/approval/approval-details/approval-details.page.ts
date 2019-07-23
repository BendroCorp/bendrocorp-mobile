import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyApproval } from 'src/app/models/approval.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.page.html',
  styleUrls: ['./approval-details.page.scss'],
})
export class ApprovalDetailsPage implements OnInit {
  approverId: number = parseInt(this.route.snapshot.paramMap.get('approval_id'))
  approval: MyApproval;
  approvalSubmitting: boolean;

  constructor(private requestService: RequestsService, 
    private route: ActivatedRoute, 
    private nav:NavController, 
    private messageService: MessageService,
    private iab: InAppBrowser) { }

  fetchApprovalDetails(event?: any) {
    if (this.approverId) {
      this.requestService.fetch_approval(this.approverId).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.approval = results;
        } else {
          this.nav.back();
        }

        if (event) {
          event.target.complete();
        }
      });
    } else {
      this.messageService.alert('Approver id not correctly passed!')
      this.nav.back();
    }
  }

  openLinkedItem(uri: string) {
    const browser = this.iab.create(`https://my.bendrocorp.com/${uri}`);
  }

  submitApproval(typeId:number) {
    if (this.approval) {
      let appDen:string = "..."
      if (typeId === 4) {
        appDen = "approve"
      }

      if (typeId == 5) {
        appDen = "deny"
      }
      if (this.messageService.confirmation(`Are you sure you want to ${appDen} approval #${this.approval.approval_id}?`)) {
        this.approvalSubmitting = true
        this.requestService.submit_approval(this.approval.approval_id, typeId).subscribe(
          (results) => {
            if (!(results instanceof HttpErrorResponse))
            {
              this.fetchApprovalDetails()
            }
            this.approvalSubmitting = false
          }
        )
      }
    }
  }

  doRefresh(event: any) {
    this.fetchApprovalDetails(event);
  }

  ngOnInit() {
    this.fetchApprovalDetails();
  }

}
