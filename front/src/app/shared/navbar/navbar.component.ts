import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  currentRoute = '';

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
