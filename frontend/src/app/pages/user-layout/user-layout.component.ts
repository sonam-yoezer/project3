import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
  img:string = 'assets/1.jpg';

  httpClient = inject(HttpClient);
  router = inject(Router);

  logout(): void {
    if (confirm("Do you want to logout?")) {
      this.httpClient.post(`${environment.baseApiUrl}/users/userLogout`, {}, { withCredentials: true })
        .subscribe({
          next: () => {
            alert('User logged out successfully');
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
