// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeModule } from './employee/employee.module'; 
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule ,// AppModule knows about app-employee
    HttpClientModule
  ],
  // providers:[EmployeeService],
  providers: [],
  bootstrap: [AppComponent] //it says what is the 1st module to be rendered when it is launching
})
export class AppModule { }



