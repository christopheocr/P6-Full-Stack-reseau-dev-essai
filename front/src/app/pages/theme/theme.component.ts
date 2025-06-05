import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/topic.model';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  topics: Topic[] = [];
  subscribedTopicsNames: string[] = [];

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.topicService.getAllTopics().subscribe({
      next: (topics) => this.topics = topics,
      error: (err) => console.error('Failed to load topics', err)
    });
    this.topicService.getSubscribedTopics().subscribe({
      next: (names) => this.subscribedTopicsNames = names,
      error: (err) => console.error('Failed to load subscribed topics', err)
    });
  }

  isSubscribed(topic: Topic): boolean {
    return this.subscribedTopicsNames.includes(topic.name);
  }

  toggleSubscription(topic: Topic): void {
  if (this.isSubscribed(topic)) {
    this.topicService.unsubscribeTopic(topic.name).subscribe({
      next: () => {
        // Retirer de la liste
        this.subscribedTopicsNames = this.subscribedTopicsNames.filter(name => name !== topic.name);
      },
      error: (err) => console.error('Erreur désabonnement', err)
    });
  } else {
    this.topicService.subscribeTopic(topic.name).subscribe({
      next: () => {
        // Ajouter dans la liste
        this.subscribedTopicsNames.push(topic.name);
      },
      error: (err) => console.error('Erreur abonnement', err)
    });
  }
}


  
}
