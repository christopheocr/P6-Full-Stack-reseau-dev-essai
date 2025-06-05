import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopicService} from '../../services/topic.service';
import { ArticleService } from '../../services/article.service';
import { Topic } from 'src/app/models/topic.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  form: FormGroup;
  topics: Topic[] = [];

  constructor(
    private fb: FormBuilder,
    private topicService: TopicService,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.form = this.fb.group({
      topicName: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.topicService.getAllTopics().subscribe({
      next: (data) => this.topics = data,
      error: (err) => console.error('Erreur lors du chargement des thèmes', err)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.articleService.createPost(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/articles']);
          console.log('Article créé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la création de l’article', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }
}
