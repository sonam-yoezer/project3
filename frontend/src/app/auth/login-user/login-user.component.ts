import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NavbarComponent } from '../../pages/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../auth.service';


@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit{
  constructor(private authService: AuthService){}

  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  router = inject(Router);
  
ngOnInit(): void{
  this.form = this.formBuilder.group({
    email:['', [Validators.email]],
    password: ['', [Validators.required]],
  });
}

submit(): void {
  // Perform the login request to the backend
  this.httpClient.post(`${environment.baseApiUrl}/users/userLogin`, this.form.getRawValue(), { withCredentials: true }).subscribe({
    next: (res: any) => {
      const userId = res.userId; // Extract user ID from the response

      // Check if userId is returned from the server
      if (userId) {
        this.authService.setRole('user'); // Set the role to 'user'
        localStorage.setItem('token', 'your-token');  // Replace 'your-token' with the actual token returned by your backend
        localStorage.setItem('isLoggedIn', 'true');   // Set the login flag
        
        // Set the current user details in the AuthService
        this.authService.setCurrentUser(userId, 'user'); // Set user ID and role

        alert("User logged in successfully");

        // Redirect to the home page after login
        this.router.navigate(['/home']);
      } else {
        alert('User ID not returned from the server.');
      }
    },
    error: (err) => {
      alert('Login failed. Please check your credentials and try again.');
      console.error('Login error:', err); // Log the error for debugging
    }
  });
}


loginAsGuest(): void {
  // Display confirmation dialog
  const confirmed = window.confirm('Do you really want to log in as Guest?');
  
  if (confirmed) {
    this.authService.setRole('guest'); // Set role to 'guest'
    this.router.navigate(   ['/home']); // Navigate to the home page for guests
  } else {
    // Optionally, you can show a message or perform some other action here
    alert('Login as Guest cancelled.');
  }
}
}
