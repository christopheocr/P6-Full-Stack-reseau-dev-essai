import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article?: Article;
  comments: Comment[] = [];
  commentContent = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/articles']);
      return;
    }

    this.articleService.getPostById(id).subscribe({
      next: (data) => this.article = data,
      error: () => this.router.navigate(['/articles'])
    });

    this.articleService.getCommentsByPostId(id).subscribe({
      next: (data) => this.comments = data,
      error: (err) => console.error('Erreur chargement commentaires', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }

  submitComment(): void {
  const postId = this.article?.id;
  const content = this.commentContent.trim();

  if (!postId || !content) return;

  this.articleService.addComment(postId, content).subscribe({
    next: (newComment) => {
      this.comments.push(newComment);
      this.commentContent = '';
    },
    error: (err) => console.error('Erreur ajout commentaire', err)
  });
}



}
