import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { SalesOrderComponent } from './salesorder/salesorder.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { FinancialComponent } from './financial/financial.component';

// Financial child components imports
import { InvoiceComponent } from './financial/invoice/invoice.component';
import { PaymentComponent } from './financial/payment/payment.component';
import { CreditdebitComponent } from './financial/creditdebit/creditdebit.component';
import { OverallsalesComponent } from './financial/overallsales/overallsales.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard/inquiry', component: InquiryComponent },
  { path: 'dashboard/salesorder', component: SalesOrderComponent },
  { path: 'dashboard/delivery', component: DeliveryComponent },

  {
    path: 'dashboard/financial',
    component: FinancialComponent,
    children: [
      { path: 'invoice', component: InvoiceComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'creditdebit', component: CreditdebitComponent },
      { path: 'overallsales', component: OverallsalesComponent },
      { path: '', redirectTo: 'invoice', pathMatch: 'full' }, // default child route
    ],
  },

  { path: '**', redirectTo: '' },
];
