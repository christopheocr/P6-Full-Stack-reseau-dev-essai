import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
 menuOpen = false;
 posts: Post[] = [];

 constructor(private router: Router,private authService: AuthService,private postService: PostService) {}

  // articles = [
  //   {
  //     title: 'Titre de l’article',
  //     date: '01/01/2025',
  //     author: 'Alice',
  //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...',
  //   },
  //   {
  //     title: 'Titre de l’article',
  //     date: '02/01/2025',
  //     author: 'Bob',
  //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...',
  //   },
  // ];

  ngOnInit(): void {
    this.postService.getFollowedPosts().subscribe({
      next: (data) => this.posts = data,
      error: (err) => console.error('Erreur chargement posts :', err)
    });
  }


  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
