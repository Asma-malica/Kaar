import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { PurordComponent } from './purord/purord.component';
import { QuotationComponent } from './quotation/quotation.component';
import { CadComponent } from './cad/cad.component';
import { GoodsrecptComponent } from './goodsrecpt/goodsrecpt.component';
import { PaymentComponent } from './payment/payment.component';

//import { PaymentComponent } from './payment/payment.component';
//import { CadComponent } from './cad/cad.component';
//import { GrComponent } from './gr/gr.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    PurordComponent,
    QuotationComponent,
    CadComponent,
    GoodsrecptComponent,
    PaymentComponent
    
    
    // PaymentComponent,
    // CadComponent,
    // GrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
