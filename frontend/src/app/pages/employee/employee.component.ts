import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { AuthService } from '../../../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, UserLayoutComponent, AdminLayoutComponent, NavbarComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
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
