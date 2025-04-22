import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeListsComponent } from './employee/employee-lists/employee-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeListsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] //it says what is the 1st module to be rendered when it is launching
})
export class AppModule { }
