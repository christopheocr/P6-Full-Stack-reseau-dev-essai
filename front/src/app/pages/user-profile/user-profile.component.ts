import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopicService } from '../../services/topic.service';
import { Topic } from 'src/app/models/topic.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form: FormGroup;
  allTopics: Topic[] = [];
  subscribedTopics: Topic[] = [];

constructor(
  private fb: FormBuilder,
  private topicService: TopicService,
  private authService: AuthService
) {
  this.form = this.fb.group({
    username: [''],
    email: [''],
    password: ['']
  });
}

  ngOnInit(): void {
     this.loadUserProfile();
    this.loadSubscriptions();
  }

  loadUserProfile(): void {
  this.authService.getCurrentUser().subscribe({
    next: (user) => {
      this.form.patchValue({
        username: user.name,
        email: user.email
      });
    },
    error: (err) => console.error('Erreur récupération user', err)
  });
}

  loadSubscriptions(): void {
    this.topicService.getSubscribedTopics().subscribe({
      next: (subscribedNames: string[]) => {
        this.topicService.getAllTopics().subscribe({
          next: (topics: Topic[]) => {
            this.allTopics = topics;
            this.subscribedTopics = topics.filter(topic =>
              subscribedNames.includes(topic.name)
            );
          }
        });
      }
    });
  }

  unsubscribe(topicName: string): void {
    this.topicService.unsubscribeTopic(topicName).subscribe({
      next: () => {
        this.subscribedTopics = this.subscribedTopics.filter(t => t.name !== topicName);
      },
      error: err => console.error('Erreur désabonnement', err)
    });
  }

  onSubmit(): void {
    const formValue = this.form.value;

  // Construction du payload uniquement avec les champs non vides
  const payload: any = {};

  if (formValue.username?.trim()) {
    payload.name = formValue.username.trim();
  }

  if (formValue.email?.trim()) {
    payload.email = formValue.email.trim();
  }

  if (formValue.password?.trim()) {
    payload.password = formValue.password.trim();
  }

  this.authService.updateCurrentUser(payload).subscribe({
    next: () => {
      console.log('Profil mis à jour');
    },
    error: (err) => {
      console.error('Erreur mise à jour profil', err);
    }
  });
  }
}
