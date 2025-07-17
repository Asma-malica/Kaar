import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { CusdelComponent } from './cusdel/cusdel.component';
import { CreditmemoComponent } from './creditmemo/creditmemo.component';
import { PaymentComponent } from './payment/payment.component';
//import { InquiryComponent } from './inquiry/inquiry.component';
import { SalesorderComponent } from './salesorder/salesorder.component';
const routes: Routes = [
  {path:'',component : LoginComponent, pathMatch:'full'},
  {path:'login',component : LoginComponent},
  {path: 'profile',component : ProfileComponent},
  {path: 'cusdel',component : CusdelComponent},
  {path: 'creditmemo',component : CreditmemoComponent},
  {path: 'salesorder',component : SalesorderComponent},
  {path: 'payment',component : PaymentComponent}


  //{path: 'payment', component : PaymentComponent}
  //{path: 'inquiry',component : InquiryComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
