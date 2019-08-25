import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-profile-interview',
  templateUrl: './profile-interview.page.html',
  styleUrls: ['./profile-interview.page.scss'],
})
export class ProfileInterviewPage implements OnInit {

  constructor(private router: Router) { }
  character: Character;

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      console.log('Loading route info');
      this.character = this.router.getCurrentNavigation().extras.state.character;
      console.log(this.character);
    } else {
      console.error('Route info could not be loaded');
    }
  }

}
