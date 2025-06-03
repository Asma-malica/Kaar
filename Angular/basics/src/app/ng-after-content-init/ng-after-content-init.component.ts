import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList } from '@angular/core';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-ng-after-content-init',
  templateUrl: './ng-after-content-init.component.html',
  styleUrls: ['./ng-after-content-init.component.css']
})
export class NgAfterContentInitComponent implements AfterContentInit{

  @ContentChildren('messageContent') messageElements !: QueryList<ElementRef>
  ngAfterContentInit() : void {
    this.messageElements.forEach(element => {
      console.log('Projected content',element.nativeElement.textContent)
    })
  }

}
