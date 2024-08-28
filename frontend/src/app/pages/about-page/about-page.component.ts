import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, UserLayoutComponent, AdminLayoutComponent,NavbarComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent implements OnInit{
  isAdmin = false;
  isUser = false;
  isGuest = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      this.isAdmin = role === 'admin';
      this.isUser = role === 'user';
      this.isGuest = role === 'guest';
    });
  }
}
