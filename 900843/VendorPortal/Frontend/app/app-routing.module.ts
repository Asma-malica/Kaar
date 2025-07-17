import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PurordComponent } from './purord/purord.component';
import { QuotationComponent } from './quotation/quotation.component';
import { CadComponent } from './cad/cad.component';
import { GoodsrecptComponent } from './goodsrecpt/goodsrecpt.component';
import { PaymentComponent } from './payment/payment.component';
const routes: Routes = [
  //{path:'',component : LoginComponent, pathMatch:'full'},
  {path:'',component : LoginComponent},
  {path:'login',component : LoginComponent},
  {path: 'profile',component : ProfileComponent},
  {path: 'purord',component : PurordComponent},
  {path: 'quotation',component : QuotationComponent},
  {path: 'cad',component : CadComponent},
  {path: 'goodsrecpt',component : GoodsrecptComponent},
  {path: 'payment', component : PaymentComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
