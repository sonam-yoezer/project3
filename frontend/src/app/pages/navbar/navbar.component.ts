import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  constructor(private authService: AuthService, private router: Router) {}

  loginAsGuest(): void {
    this.authService.setRole('guest'); // Set role to 'guest'
    this.router.navigate(['/home']); // Navigate to the home page for guests
  }

}
