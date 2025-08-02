// Import Routes type for route configuration
import type { Routes } from '@angular/router';

// Import your standalone components used in routing
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaveComponent } from './leave/leave.component';
import { PayslipComponent } from './payslip/payslip.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'payslip', component: PayslipComponent },
  { path: '**', redirectTo: 'login' }
];
