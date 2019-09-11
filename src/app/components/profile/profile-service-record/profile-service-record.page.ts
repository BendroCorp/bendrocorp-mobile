import { Component, OnInit } from '@angular/core';
import { Character, Award } from 'src/app/models/character.model';
import { Router } from '@angular/router';
import { EventAttendence } from 'src/app/models/event.model';

@Component({
  selector: 'app-profile-service-record',
  templateUrl: './profile-service-record.page.html',
  styleUrls: ['./profile-service-record.page.scss'],
})
export class ProfileServiceRecordPage implements OnInit {
  character: Character;
  awardChunks = [];
  constructor(private router: Router) { }

  chunkArray(array, size) {
    let result = [];
    for (let value of array){
        let lastArray = result[result.length - 1];
        if (!lastArray || lastArray.length === size) {
            result.push([value]);
        } else {
            lastArray.push(value);
        }
    }
    return result;
  }

  attendedEvents(attends: EventAttendence[]) {
    if (this.character) {
      return attends.filter(x => x.attendence_type_id === 1);
    }
  }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      console.log('Loading route info');
      this.character = this.router.getCurrentNavigation().extras.state.character;
      console.log(this.character);
      this.awardChunks = this.chunkArray(this.character.awards, 2);
    } else {
      console.error('Route info could not be loaded');
    }
  }

}
