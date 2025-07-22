import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },   // Redirect root to login
  { path: 'login', component: LoginComponent },           // Login route

  {
    path: 'dashboard',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'rfq', loadComponent: () => import('./rfq/rfq.component').then(m => m.RfqComponent) },
      { path: 'purchase-orders', loadComponent: () => import('./purchase-orders/purchase-orders.component').then(m => m.PurchaseOrdersComponent) },
      { path: 'goods-receipt', loadComponent: () => import('./goods-receipt/goods-receipt.component').then(m => m.GoodsReceiptComponent) },

      // Financials Main Tile Page
      { path: 'financials', loadComponent: () => import('./financials/financials.component').then(m => m.FinancialsComponent) },

      // Financial Sub Routes
      { path: 'financials/invoices', loadComponent: () => import('./financials/invoices-details/invoices-details.component').then(m => m.InvoicesDetailsComponent) },
      { path: 'financials/payments-aging', loadComponent: () => import('./financials/payments-aging/payments-aging.component').then(m => m.PaymentsAgingComponent) },
      { path: 'financials/credit-debit-memo', loadComponent: () => import('./financials/credit-debit-memo/credit-debit-memo.component').then(m => m.CreditDebitMemoComponent) }
    ]
  },

  { path: '**', redirectTo: 'login' }  // Wildcard to handle unknown routes
];
