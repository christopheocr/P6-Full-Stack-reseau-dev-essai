import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const credentials = {
        login: this.form.value.identifier,
        password: this.form.value.password
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response.status === 200 && response.body?.token) {
            localStorage.setItem('Token', response.body.token);
            this.router.navigate(['/articles']);
          }
        },
        error: (error) => {
          this.loginError = 'Identifiants invalides. Veuillez réessayer.';
          console.error('Erreur lors de la connexion', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
