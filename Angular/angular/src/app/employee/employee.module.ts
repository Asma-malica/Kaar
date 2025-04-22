import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeListsComponent } from './employee-lists/employee-lists.component';
import { EmployeeComponent } from './employee.component';

@NgModule({
  declarations: [EmployeeComponent, EmployeeListsComponent], //the component we are using
  imports: [CommonModule, FormsModule], 
  exports: [EmployeeComponent], // exporting the EmployeeComponent so it can be used in AppModule
})
export class EmployeeModule {}
