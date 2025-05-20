import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
identifier = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  login() {
     const payload = {
      login: this.identifier,
      password: this.password,
    };

    this.http.post<{ token: string }>('http://localhost:9000/auth/login', payload).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/articles']);
      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
        alert('Identifiants invalides.');
      },
    });
  }
}
