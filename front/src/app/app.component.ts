import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router,
  private location: Location) {}

ngOnInit(): void {
  const currentUrl = this.location.path();
  const token = this.authService.getToken();

  if (token && !this.authService.isTokenValid()) {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }

  if (token && this.authService.isTokenValid() && currentUrl === '') {
    this.router.navigate(['/articles']);
  }
}




}

