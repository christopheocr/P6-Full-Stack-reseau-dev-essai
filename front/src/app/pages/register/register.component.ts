import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const payload = {
        name: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.authService.register(payload).subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error('Erreur lors de l’inscription', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
