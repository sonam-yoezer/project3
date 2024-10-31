import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,  // Ensure HttpClientModule is imported
  ],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  form!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit(): void {
    this.httpClient.post(`${environment.baseApiUrl}/admin/adminLogin`, this.form.getRawValue(), { withCredentials: true })
      .subscribe({
        next: () => {
          this.authService.setRole('admin');
          alert('Admin logged in successfully');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          if (err.status === 400) {
            alert('Incorrect email or password. Please try again.');
          } else {
            alert('An unexpected error occurred.');
          }
        }
      });
  }

  loginAsGuest(): void {
    const confirmed = window.confirm('Do you really want to log in as Guest?');
    if (confirmed) {
      this.authService.setRole('guest');
      this.router.navigate(['/home']);
    } else {
      alert('Login as Guest cancelled.');
    }
  }
}
