import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  register() {
    const payload = {
      email: this.email,
      name: this.username,
      password: this.password,
    };

    this.http.post('http://localhost:9000/auth/register', payload).subscribe({
      next: () => {
        // ✅ Redirection après succès
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur lors de l’inscription', err);
        alert('Inscription échouée. Vérifie les données.');
      },
    });
  }
}
