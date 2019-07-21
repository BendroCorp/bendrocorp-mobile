import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RequestsService } from 'src/app/services/requests.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.page.html',
  styleUrls: ['./more-menu.page.scss'],
})
export class MoreMenuPage implements OnInit {
  pendingApprovals: number = 0;

  constructor(private nav: NavController, private userService: UserService) { }

  ngOnInit() {
    this.userService.fetchPendingApprovalsCount().subscribe((result) => {
      this.pendingApprovals = result
    })
  }

  openMenuItem(uri: string) {
    console.log(`menu try nav: ${uri}`);
    
    this.nav.navigateForward(uri);
  }

}
