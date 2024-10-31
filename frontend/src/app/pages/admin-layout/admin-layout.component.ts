import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http'; // Correctly import HttpClient
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, NavbarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'], // Correct property name to 'styleUrls'
})
export class AdminLayoutComponent {
  httpClient = inject(HttpClient);
  router = inject(Router);

  constructor() {}

  logout(): void {
    if (confirm("Do you want to logout?")) {
      this.httpClient.post(`${environment.baseApiUrl}/admin/logout`, {}, { withCredentials: true })
        .subscribe({
          next: () => {
            alert('Admin logged out successfully');
            this.router.navigate(['/']);
          },
          error: () => {
            alert('Logout failed.');
          }
        });
    } else {
      alert("User cancelled logout");
    }
  }
}
