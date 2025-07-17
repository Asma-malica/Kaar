import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditmemo',
  templateUrl: './creditmemo.component.html',
  styleUrls: ['./creditmemo.component.css']
})
export class CreditmemoComponent {
  dataloaded = false;
  container = true;
  code:any;
  
  login: any;
  url = "http://localhost:3030/creditmemo";
//element: any;
  
  constructor(private http: HttpClient, private router: Router, ) { 
    //this.login = {

      //Username:this._data.usernametest,

      //Password:'',

   // };

  }

  ngOnInit(): void {

    

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    this.http.post(this.url, JSON.stringify(this.login), { headers: headers }).subscribe((data: any) => {
      console.log(data.a1);
      
      // setTimeout(() => {
      this.container = true;  
      // }, 3000);
       this.code= data.a1;
    
       

    });
    
  }
  

}




