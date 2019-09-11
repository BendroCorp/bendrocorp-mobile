import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { Character, CharacterApplicationComment } from 'src/app/models/character.model';
import { ApplicationService } from 'src/app/services/application.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-profile-application',
  templateUrl: './profile-application.page.html',
  styleUrls: ['./profile-application.page.scss'],
})
export class ProfileApplicationPage implements OnInit {
  character: Character;
  newComment: CharacterApplicationComment;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private applicationService: ApplicationService,
    private messageService: MessageService
  ) { }

  addApplicationComment() {
    if (this.newComment.comment.length > 0) {
      this.newComment.application_id = this.character.application.id;
      this.applicationService.addApplicationComment(this.newComment).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.character.application.comments.push(results);
          this.newComment = { } as CharacterApplicationComment;
          this.profileService.refreshData();
        }
      });
    } else {
      this.messageService.alert('You must enter an actual comment!');
    }
  }

  ngOnInit() {
    this.newComment = { } as CharacterApplicationComment;

    if (this.router.getCurrentNavigation().extras.state) {
      console.log('Loading route info');
      this.character = this.router.getCurrentNavigation().extras.state.character;
      console.log(this.character);
    } else {
      console.error('Route info could not be loaded');
    }
  }

}
