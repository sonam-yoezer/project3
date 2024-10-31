import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service';
import { UserService } from '../../../user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatDialogModule,
    UserLayoutComponent,
    AdminLayoutComponent,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  constructor(private authService: AuthService) {}
  httpClient = inject(HttpClient);
  router = inject(Router);


  loginAsGuest(): void {
    this.authService.setRole('guest'); // Set role to 'guest'
    this.router.navigate(['/home']); // Navigate to the home page for guests
  }

}
