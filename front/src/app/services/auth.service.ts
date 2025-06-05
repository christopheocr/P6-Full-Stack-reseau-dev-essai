import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'Token';
  private readonly apiUrl = 'http://localhost:9000/auth';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return expiry && expiry > now;
    } catch {
      return false;
    }
  }

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { observe: 'response' });
  }

  login(credentials: { login: string; password: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials, { observe: 'response' });
}

getCurrentUser(): Observable<{ id: number; name: string; email: string }> {
  return this.http.get<{ id: number; name: string; email: string }>(`${this.apiUrl}/me`);
}

updateCurrentUser(data: Partial<{ name: string; email: string; password: string }>): Observable<any> {
  return this.http.put('http://localhost:9000/me', data);
}



}
