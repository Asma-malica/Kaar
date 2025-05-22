import { Directive ,Input ,ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = '';

  constructor(private ele : ElementRef) { }
  @HostListener('mwhar ouseenter') onMouseEnter(){
    this.highlight(this.appHighlight || 'blue')
  }

   @HostListener('mouseleave') onMouseLeave(){
    this.highlight('')
  }

  private highlight(color:string){
    this.ele.nativeElement.style.backgroundColor = color ;
  }

}
