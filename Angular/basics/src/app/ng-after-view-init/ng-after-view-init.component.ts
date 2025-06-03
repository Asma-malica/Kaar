import { AfterViewInit, Component ,ElementRef,OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-ng-after-view-init',
  templateUrl: './ng-after-view-init.component.html',
  styleUrls: ['./ng-after-view-init.component.css']
})
export class NgAfterViewInitComponent implements AfterViewInit{
  //focus the input once view initialized
  @ViewChild('nameInput') nameInput!:ElementRef
  ngAfterViewInit() : void{
    this.nameInput.nativeElement.focus()
    console.log('Input focused')
  }

}
