import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-background',
  templateUrl: './profile-background.page.html',
  styleUrls: ['./profile-background.page.scss'],
})
export class ProfileBackgroundPage implements OnInit {
  character: Character;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('profile background init');

    if (this.router.getCurrentNavigation().extras.state) {
      console.log('Loading route info');
      this.character = this.router.getCurrentNavigation().extras.state.character;
      console.log(this.character);
    } else {
      console.error('Route info could not be loaded');
    }
  }

}
