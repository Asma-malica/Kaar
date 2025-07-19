import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'rfq', loadComponent: () => import('./rfq/rfq.component').then(m => m.RfqComponent) },
      { path: 'purchase-orders', loadComponent: () => import('./purchase-orders/purchase-orders.component').then(m => m.PurchaseOrdersComponent) },
      { path: 'goods-receipt', loadComponent: () => import('./goods-receipt/goods-receipt.component').then(m => m.GoodsReceiptComponent) },
      { path: 'financials', loadComponent: () => import('./financials/financials.component').then(m => m.FinancialsComponent) },
      { path: '', redirectTo: 'profile', pathMatch: 'full' } // optional default
    ]
  }
];
