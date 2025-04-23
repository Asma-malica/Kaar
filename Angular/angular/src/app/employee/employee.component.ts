import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employeeData: any[] = [];

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployee();
  }

  fetchEmployee() {
    this.empService.getEmployee().subscribe(
      (data) => {
        // Fetching your data asynchronously
        this.employeeData = data;
      },
      (error) => {
        // Handle error
        console.error('Error fetching the data: ' + error);
      }
    );
  }
}







// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from './employee.service'; // adjust the path if needed

// @Component({
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css']
// })
// export class EmployeeComponent implements OnInit {
//   role: string = 'Associate';
//   employeeData: any[] = [];
//   employee: any = {
//     name: '',
//     username: '',
//     email: '',
//     phone: '',
//     website: '',
//   };

//   constructor(private empService: EmployeeService) {}

//   ngOnInit(): void {
//     this.fetchEmployee();
//   }

//   fetchEmployee() {
//     this.empService.getEmployee().subscribe(
//       //fetching the data asynchronously
//       (data: any[]) => {
//       this.employeeData = data;
//     }, error => {
//       console.error('Error fetching employees', error);
//     }  );
//     ()=>{
// console.log("completed")
//     }

//   }
// }
