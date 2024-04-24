import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewUploadedFileComponent } from '../view-uploaded-file/view-uploaded-file.component';

@Component({
  selector: 'view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss']
})
export class ViewFileComponent {
  @Input() file;
  @Output() fileReset = new EventEmitter();
  @Output() removeFile = new EventEmitter();
  @Input() data;
  @Input() reset: boolean;
  @Input() remove: boolean;
  @Input() download: boolean;
  @Input() disableElements;
  fileName: string;
  constructor(private _modalService: NgbModal) { }
  ngOnInit() {
  }
  fileAction(action) {
    if (action == 'view')
      this.openFileModal();
    else if (action == 'reset')
      this.fileReset.emit(true);
    else if (action == 'remove')
      this.removeFile.emit(true);

  }
  openFileModal() {
    const ref = this._modalService.open(ViewUploadedFileComponent);
    if (this.data?.isUploaded) {
      ref.componentInstance.data = this.data;
    }
    else {
      ref.componentInstance.file = this.file;
    }
  }
  getFileType(fileName) {
    return fileName?.split('/').pop();
  }

}
