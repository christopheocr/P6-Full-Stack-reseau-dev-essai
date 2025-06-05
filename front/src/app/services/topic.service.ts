import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private readonly apiUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/topic`);
  }

  // Topics abonnés par l'utilisateur connecté
  getSubscribedTopics(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/me/topics`);
  }

  subscribeTopic(name: string): Observable<any> {
  return this.http.post(`http://localhost:9000/me/topics?name=${name}`, {});
}

unsubscribeTopic(name: string): Observable<any> {
  return this.http.delete(`http://localhost:9000/me/topics?name=${name}`);
}





}
