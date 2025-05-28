import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';


@Injectable({ providedIn: 'root' })
export class PostService {
  
  private apiUrl = 'http://localhost:9000/posts';

  constructor(private http: HttpClient) {}

  getFollowedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl+"/followed");
  }

  createPost(data: { topicName: string; title: string; content: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
