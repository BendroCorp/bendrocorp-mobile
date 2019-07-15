import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  sessionEmail: string;
  sessionPassword: string;
  sessionCode: string;

  constructor(private authService: AuthService, private router: Router) { }

  doLogin() {
    if (this.sessionEmail && this.sessionPassword) {
      this.authService.login(this.sessionEmail, this.sessionPassword, this.sessionCode).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.authService.setSession(results.id_token);
          this.sessionEmail = null;
          this.sessionPassword = null;
          this.sessionCode = null;
          this.router.navigateByUrl('/');
        }
      });
    }
  }

  ngOnInit() {
  }

}
