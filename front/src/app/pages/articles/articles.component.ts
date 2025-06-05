import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  selectedArticleIndex = 0;
  sortDescending = true;


  constructor(private router: Router, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getFollowedPosts().subscribe({
      next: (articles) => this.articles = articles,
      error: (err) => console.error('Erreur chargement articles', err)
    });
  }

  selectArticle(index: number): void {
    this.selectedArticleIndex = index;
  }

  onCreateArticle(): void {
    this.router.navigate(['/article-form']);
  }

  onSortToggle(): void {
     this.sortDescending = !this.sortDescending;

  this.articles.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return this.sortDescending ? dateB - dateA : dateA - dateB;
  });
  }

  openArticle(id: number): void {
    this.router.navigate(['/article', id]);
  }

  goToThemes(): void {
  this.router.navigate(['/theme']);
}

}
