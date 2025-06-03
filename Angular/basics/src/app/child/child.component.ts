import { Component, OnChanges, SimpleChanges,Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})

// ngOnChanges
export class ChildComponent implements OnChanges {
  @Input() items : any = [] = []
  @Input() topic = ''
    ngOnChanges(changes: SimpleChanges): void {
        if(changes['items']){
          console.log('items property changed',changes['items'])
        }
        if(changes['topic']){
          console.log('topic property changed',changes['topic'])
        }
    }
}
