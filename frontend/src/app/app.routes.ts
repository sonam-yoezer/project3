import { Routes } from '@angular/router';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { RegisterComponent } from './auth/register/register.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { EditComponent } from './pages/edit/edit.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from '../auth.guard';


export const routes: Routes = [
  { path: 'home', component: HomePageComponent}, // Protect the home route
  { path: 'admin', component: LoginAdminComponent},
  { path: '', component: LoginUserComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'employee', component: EmployeeComponent},
  { path: 'about', component: AboutPageComponent},
  { path: 'ad', component: AdminLayoutComponent},
  { path: 'us', component: UserLayoutComponent},
  { path: 'nav', component: NavbarComponent},
  { path: 'user', component: UserComponent},
  { path: 'pages/edit/:id', component: EditComponent },

];

