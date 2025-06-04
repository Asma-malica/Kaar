import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  id!:string |null
  constructor(private route : ActivatedRoute){

  }
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get("id")
  }

}
