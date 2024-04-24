import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-in-large-view-modal',
  templateUrl: './in-large-view-modal.component.html',
  styleUrls: ['./in-large-view-modal.component.scss']
})
export class InLargeViewModalComponent {
  @Input() data;
  allowPrint = false;
  constructor(public _activeModal: NgbActiveModal) { }

  ngOnInit() {
    let ext = this.getFileExtenstion(this.data?.file);
    if (ext == 'jpg' || ext == 'jpeg' || ext == 'png')
      this.allowPrint = true;
  }
  getFileExtenstion(file) {
    if (file) {
      return file.split('.').pop();
    }
    else
      return null;
  }
  print() {

  }
}
