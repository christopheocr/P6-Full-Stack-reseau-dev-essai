import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl = 'http://localhost:9000/posts';

  constructor(private http: HttpClient) {}

  getFollowedPosts(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/followed`);
  }

  getPostById(id: number): Observable<Article> {
  return this.http.get<Article>(`${this.apiUrl}/${id}`);
}

createPost(postData: {
  title: string;
  content: string;
  topicName: string;
}): Observable<any> {
  return this.http.post(this.apiUrl, postData);
}

getCommentsByPostId(postId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`http://localhost:9000/comments/${postId}`);
}

addComment(postId: number, content: string): Observable<Comment> {
  return this.http.post<Comment>('http://localhost:9000/comments', {
    postId,
    content
  });
}

}
