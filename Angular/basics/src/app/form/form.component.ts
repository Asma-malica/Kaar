import { Component ,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  carName : string= '';
  @Output() carAdded = new EventEmitter<string>();


  onSubmit(){
    console.log(this.carName)
    // sending the value outside the component 
    this.carAdded.emit(this.carName)
    this.carName = ''
  }

}
