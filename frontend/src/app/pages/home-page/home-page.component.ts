import { Component, OnInit } from '@angular/core';

import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [UserLayoutComponent, AdminLayoutComponent, CommonModule,NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
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
