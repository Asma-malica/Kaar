import { Component ,Output, EventEmitter } from '@angular/core';
import { CarService } from '../car.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  carName : string= '';
  // @Output() carAdded = new EventEmitter<string>();


  // cauzz of service 
  constructor(private carService: CarService) {
    
  }

  onSubmit(){
    console.log(this.carName)
    // sending the value outside the component using output decorator
    // this.carAdded.emit(this.carName)

    //sending the value outside the component using SERVICES
    this.carService.addCarName(this.carName)

    this.carName = ''
  }

}
