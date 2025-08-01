import { Component , Input, OnInit } from '@angular/core';
//decorator -> shows the meta data of the component 
@Component({
  selector: 'app-employee-lists', 
  // employee-lists is the component and we have to use that inside the employee module 
  // to that so we have to refer it that is known as selector
  templateUrl: './employee-lists.component.html', //ui
  styleUrls: ['./employee-lists.component.css'] //component css
})

export class EmployeeListsComponent implements OnInit {
  title = 'Employee Data';
  @Input()employeeData:any[] = [];
  searchTerm: string = '';
  // employeeData: any[] = [];
  
// OnInit -> It is the interface 
// on initializing the app the content would be running here 
// (to display the content in html file)
  ngOnInit() {
    //interpolation -> {{}} to bind the data from ts file to html file 

    //event binding (clicking event)
    //get the data from api
    this.employeeData = [
      {
        name: 'Eg',
        role: 'Associate Analyst',
        years: 2,
      },
      {
        name: 'Sr',
        role: 'Senior Analyst',
        years: 3,
      },
      {
        name: 'As',
        role: 'SAP Analyst',
        years: 4,
      },
    ];
  }
  clearResult() {
    this.searchTerm = ''; 
  }
  //class which is used for searching the data 
  fetchthefilteredData() {
    console.log(this.searchTerm);
    return this.employeeData.filter((emp) =>
      emp.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
