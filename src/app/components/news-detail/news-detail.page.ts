import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ILNewsStory } from 'src/app/models/news.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  newsItem: ILNewsStory;
  constructor(
    private modalController: ModalController,
    private messageService: MessageService
  ) { }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

}
