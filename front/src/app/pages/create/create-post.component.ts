import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  topicName = '';
  title = '';
  content = '';

  constructor(private postService: PostService, private router: Router) {}

  createPost() {
    if (!this.topicName || !this.title || !this.content) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    const body = {
      topicName: this.topicName,
      title: this.title,
      content: this.content
    };

    this.postService.createPost(body).subscribe({
      next: () => this.router.navigate(['/articles']),
      error: err => {
        console.error(err);
        alert('Erreur lors de la création du post.');
      }
    });
  }
}
