import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() id: string = '';

  form!: FormGroup;
  fromBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  router = inject(Router);

  ngOnInit(): void {
    this.form = this.fromBuilder.group({
      userName: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      CID: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^(\+975-)\d{8}$/)]],
      jobDesignation: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Minimum length of 8 characters
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/) // At least one letter and one number
        ]
      ],
      
      conformPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator }); // Add custom validator here
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const conformPassword = group.get('conformPassword')?.value;
    return password === conformPassword ? null : { 'passwordMismatch': true };
  }

  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  // ... other existing properties and code

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPasswordVisibility(): void {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  onSave() {
    if (this.form.valid) {
      this.httpClient.post(`${environment.baseApiUrl}/users/registerUser`, this.form.value).subscribe({
        next: (data) => {
          alert('User registered successfully');
          this.router.navigate(['/']);
        },
        error: () => {
          alert('User Name, Email, or CID number already exists');
        }
      });
    } else {
      this.showValidationErrors();
    }
  }

  showValidationErrors() {
    const errors = this.form.errors;
    if (errors && errors['passwordMismatch']) {
      alert('Password and Confirm Password do not match');
    }
  }
}
