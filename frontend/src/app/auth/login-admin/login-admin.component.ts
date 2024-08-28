import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit{
  constructor(private authService: AuthService){}

  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);;
  router = inject(Router);
  
ngOnInit(): void{
  this.form = this.formBuilder.group({
    email:['', [Validators.email]],
    password: ['', [Validators.required]],
  });
}

submit(): void {
  this.httpClient.post(`${environment.baseApiUrl}/admin/adminLogin`, this.form.value).subscribe({
 
    next: res=> {
      this.authService.setRole('admin');
      alert("Admin logged in succesfully");
      this.router.navigate(['/home']);
    },

    error: (err) => {
      if (err.status === 400) {
        alert('Incorrect email or password. Please try again.');
      } else{
        alert('An unexpected error');
      }
    }
  });
}
}
