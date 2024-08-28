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
  httpClient = inject(HttpClient);;
  router = inject(Router);
  
ngOnInit(): void{
  this.form = this.formBuilder.group({
    email:['', [Validators.email]],
    password: ['', [Validators.required]],
  });
}

submit(): void {
  this.httpClient.post(`${environment.baseApiUrl}/users/userLogin`, this.form.getRawValue(), {withCredentials: true}).subscribe({
 
    next: res=> {
      this.authService.setRole('user');
      alert("User logged in succesfully");
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
