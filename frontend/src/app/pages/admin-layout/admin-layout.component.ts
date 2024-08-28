import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  httpClient = inject(HttpClient);
  router = inject(Router);

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
