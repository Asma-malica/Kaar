import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template :"<h1>{{title}}</h1>",
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Basics';
  // 2way binding
  Name = "Asma Malica"
//string interpolation
  rollno = "21CSR011" //VARIABLE
  getName(){ //FUNCTION ( method calls)
    return "Asma" ;
  }
  // string interpolation with attribute binding
  imageUrl = "assets/quote.jpg"
  imageAlt = "image "
// property binding 
isDisabled = false
text = "Property Binding"
// property binding with safe navigation operator
user = {
  name : 'Asma',
  age :21
}
// if we didnt give value like above one means we will get error therefore use safe navigation operator 

user1 : any = null; //  maybe user data comes later from an API
// to avoid the error we use safe navigation operator 
// to use the data from user1 use ngonInit

ngOnInit(){
  this.user1 = {
    name : "Malica"
  }
}
// Event Binding  
count = 0
clickMe(){
  this.count++
}

// Directives 
//ngFor
movies = [
  'Journey to the center of the Earth',
  'Sky kids 2'
]
//ngFor Index
fruits = ['Plums' , 'Apple' , 'Pomegranate']

// ngIf
showMe = true;

//Attribute Directive 
//ngClass
applyBlue = false ;

// Date pipe
toDate = new Date();

// slice pipe
name = 'Asma Malica'

items = ['one','two','three','four']

// upper and lowercase pipe
nam = 'Asma Malica'
//currency pipe
price = 100

// sharing data between component

// to get the data from form component to list component we create carNames 
// this is for using decorator we have created carNames 
// carNames : string[] = []
// onCarAdded(carName : string){
//   console.log(carName , 'From App')
//   this.carNames.push(carName)
// }

// Now Using Services 





}
