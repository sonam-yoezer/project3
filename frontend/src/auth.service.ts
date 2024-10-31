import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserId: string | null = null;
  private roleSubject = new BehaviorSubject<string>('guest'); // Default role
  role$: Observable<string> = this.roleSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.loadUserData();
  }

  setRole(role: string): void {
    this.roleSubject.next(role);
  }

  getRole(): string {
    return this.roleSubject.value;
  }

  setCurrentUser(id: string, role: string): void {
    this.currentUserId = id;
    this.roleSubject.next(role);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userId', id);
      localStorage.setItem('userRole', role);
    }
  }

  getCurrentUserId(): string | null {
    if (this.currentUserId) {
      return this.currentUserId;
    }
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userId');
    }
    return null; // Return null if not in browser
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUserId(); // Check if user ID exists
  }

  private loadUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUserId = localStorage.getItem('userId');
      const role = localStorage.getItem('userRole');
      if (role) {
        this.roleSubject.next(role);
      }
    }
  }

  logout(): void {
    this.currentUserId = null;
    this.roleSubject.next('guest');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
    }
  }
}
