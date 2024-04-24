import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
    selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

    constructor(private el: ElementRef) { }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initialValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
        if (initialValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        event.preventDefault();
        const pastedInput: string | undefined = event?.clipboardData?.getData('text/plain')
            .replace(/\D/g, ''); // get a digit-only string
        document.execCommand('insertText', false, pastedInput);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        const textData = event?.dataTransfer?.getData('text').replace(/\D/g, '');
        this.el.nativeElement.focus();
        document.execCommand('insertText', false, textData);
    }

}
