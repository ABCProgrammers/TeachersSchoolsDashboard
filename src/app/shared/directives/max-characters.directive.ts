import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMaxCharacters]'
})
export class MaxCharactersDirective {
  maxLength: number = 3;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Check if the value is a valid number between 0 and 100
    if (!this.isValidNumber(value)) {
      // If the value is not valid, remove the last character
      input.value = value.slice(0, -1);
      event.preventDefault();
    } else if (value.length > this.maxLength) {
      // If the value is within the valid range, check the maximum length
      input.value = value.slice(0, this.maxLength);
      event.preventDefault();
    }
  }

  // Helper function to check if the value is a valid number between 0 and 100
  private isValidNumber(value: string): boolean {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
  }
}
