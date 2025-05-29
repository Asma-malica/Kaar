import { Component , OnInit, Input } from '@angular/core';
import { CarService } from '../car.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // using @input decorator 
  // @Input() carNames :string[] = []
  // using services 
  carNames : string[] = []
  constructor(private carService : CarService){

  }
  ngOnInit() : void{
    this.carService.carNames1.subscribe((names)=>{
      this.carNames = names ;
    })
  }

}
