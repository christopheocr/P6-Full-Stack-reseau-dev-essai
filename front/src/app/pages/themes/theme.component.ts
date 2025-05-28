import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';

@Component({
  standalone: true,
  selector: 'app-themes',
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
  imports: [CommonModule]
})
export class ThemesComponent implements OnInit {
  topics: Topic[] = [];
  followed: number[] = [];

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics() {
    this.topicService.getAll().subscribe(all => {
      this.topics = all;
    });

    this.topicService.getFollowed().subscribe(followed => {
      this.followed = followed.map(t => t.id);
    });
  }

  isFollowed(id: number): boolean {
    return this.followed.includes(id);
  }

  toggleFollow(id: number) {
    if (this.isFollowed(id)) {
      this.topicService.unfollow(id).subscribe(() => this.loadTopics());
    } else {
      this.topicService.follow(id).subscribe(() => this.loadTopics());
    }
  }
}
