import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-ng-on-destroy',
  templateUrl: './ng-on-destroy.component.html',
  styleUrls: ['./ng-on-destroy.component.css']
})
export class NgOnDestroyComponent implements OnInit{
  counter : number = 0 
  private intervalId : any 
  //starts the timer
  ngOnInit(): void {
      this.intervalId = setInterval(()=>{
        this.counter++;
      },1000)
      console.log('Interval id : ',this.intervalId)
  }
  //clear the timer 
  ngOnDestroy(): void{
    clearInterval(this.intervalId)
    console.log('Ondestroy timer stopped')
  }

}
