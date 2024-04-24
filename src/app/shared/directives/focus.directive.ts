import { Directive, OnInit, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[myFocus]'
})
export class FocusDirective implements OnInit {

  @Input('myFocus') isFocused: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
      
  }
  
  ngOnChanges() {
    if(this.isFocused) {   
      this.hostElement.nativeElement.focus();
    }
  }
}