import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.css']
})
export class NavigationButtonComponent {
  @Input() label: string = '';
  @Input() route: string = '';

  constructor(private router: Router) {}

  navigate(): void {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}
