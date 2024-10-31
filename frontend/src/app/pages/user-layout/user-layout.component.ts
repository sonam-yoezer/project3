import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { UserService } from '../../../user.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, NavbarComponent, AdminLayoutComponent, HttpClientModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent{
  img:string = 'assets/1.jpg';
  httpClient = inject(HttpClient);
  router = inject(Router);


  logout(): void {
    if (confirm("Do you want to logout?")) {
      this.httpClient.post(`${environment.baseApiUrl}/users/userLogout`, {}, { withCredentials: true })
        .subscribe({
          next: () => {
            alert('User logged out successfully');
            localStorage.removeItem('token'); // Clear token
            localStorage.removeItem('isLoggedIn'); // Clear login flag
            this.router.navigate(['/']); // Ensure guard is triggered on navigation
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
