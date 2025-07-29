import { Routes } from '@angular/router';

// App-level pages
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { SalesOrderComponent } from './salesorder/salesorder.component';
import { DeliveryComponent } from './delivery/delivery.component';

// Financial section
import { FinancialComponent } from './financial/financial.component';
import { InvoiceComponent } from './financial/invoice/invoice.component';
import { PaymentComponent } from './financial/payment/payment.component';
import { CreditDebitComponent } from './financial/creditdebit/creditdebit.component';
import { OverallSalesComponent } from './financial/overallsales/overallsales.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard/inquiry', component: InquiryComponent },
  { path: 'dashboard/salesorder', component: SalesOrderComponent },
  { path: 'dashboard/delivery', component: DeliveryComponent },

  // Financial (tiles page)
  { path: 'dashboard/financial', component: FinancialComponent },

  // Financial detail pages as siblings (full-page detail, not children)
  { path: 'dashboard/financial/invoice', component: InvoiceComponent },
  { path: 'dashboard/financial/payment', component: PaymentComponent },
  { path: 'dashboard/financial/creditdebit', component: CreditDebitComponent },
  { path: 'dashboard/financial/overallsales', component: OverallSalesComponent },

  { path: '**', redirectTo: '' },
];
