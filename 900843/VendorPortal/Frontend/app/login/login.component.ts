import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  login:any;
  url = "http://localhost:3030/";
  //private _data: any;

  constructor(private router: Router , private http: HttpClient){
    this.login = {
      Username:'5',
      Password:'NITHYA',
    };
  }
  
  ngOnInit(): void {
  }
  Onsubmit(){
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
this.http.post(this.url, JSON.stringify(this.login), { headers: headers }).subscribe((data: any) => {
        console.log("sended data");
        console.log(data.status1);
        if (data.status1 == "1") {
          this.router.navigate(['profile']);
          //console.log(this.login.Username);
          //this._data.append(this.login.Username);


          // this.error = true;
        } else {
         
          alert('ENTER PROPER ID  AND PASSWORD');

        }

      });


    }  
  }
  





