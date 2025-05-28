import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic';


@Injectable({ providedIn: 'root' })
export class TopicService {
  private apiUrl = 'http://localhost:9000/topic';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }

  getFollowed(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/followed`);
  }

  follow(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/follow/${id}`, {});
  }

  unfollow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/unfollow/${id}`);
  }
}
