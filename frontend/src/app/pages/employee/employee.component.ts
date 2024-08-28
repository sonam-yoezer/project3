import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { AuthService } from '../../../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, UserLayoutComponent, AdminLayoutComponent, NavbarComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  httpClient = inject(HttpClient);
  router = inject(Router);

  isAdmin = false;
  isUser = false;
  isGuest = false;

  constructor(private authService: AuthService) {}

  employeeList: {
    id: string;
    userName: string;
    fullName: string;
    CID: string;
    email: string;
    contact: string;
    jobDesignation: string;
  }[] = [];
  id: any;
  form: any;

  ngOnInit(): void {
    this.fetchEmployee();
    this.authService.role$.subscribe(role => {
      this.isAdmin = role === 'admin';
      this.isUser = role === 'user';
      this.isGuest = role === 'guest';
    });
  }

  fetchEmployee() {
    this.httpClient.get<{ users: { 
      id: string;
      userName: string;
      fullName: string;
      CID: string;
      email: string;
      contact: string;
      jobDesignation: string;
    }[] }>(`${environment.baseApiUrl}/users`).subscribe({
      next: (response) => {
        // Ensure the response has the `users` property and it is an array
        if (Array.isArray(response.users)) {
          this.employeeList = response.users;
        } else {
          console.error('Expected an array for users but received:', response.users);
          this.employeeList = []; // Fallback to an empty array
        }
      },
      error: () => {
        alert('There was an error');
      }
    });
  }


  onDelete(id: string) {
    if (confirm("Do you want to Delete?")) {
      this.httpClient.delete(`${environment.baseApiUrl}/users/${id}`).subscribe({
        next: (data) => {
          alert('User has been Deleted Sucessfully');
          this.fetchEmployee();
        },
        error: () => {
          alert('There was an error!');
        }
      });
    } else {
    }
  }

}
