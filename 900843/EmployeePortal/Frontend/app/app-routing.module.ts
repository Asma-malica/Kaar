import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavedataComponent } from './leavedata/leavedata.component';
import { LoginComponent } from './login/login.component';
import { PayslipComponent } from './payslip/payslip.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {path:'',component : LoginComponent},
  {path:'login',component : LoginComponent },
  {path:'leavedata',component : LeavedataComponent   },
  {path:'payslip', component : PayslipComponent},
  {path: 'profile',component : ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
