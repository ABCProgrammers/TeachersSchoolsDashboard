import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-uploaded-file',
  templateUrl: './view-uploaded-file.component.html',
  styleUrls: ['./view-uploaded-file.component.scss']
})
export class ViewUploadedFileComponent {
  @Input() file;
  @Input() data;
  fileType = '';
  constructor(public _activeModal: NgbActiveModal, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {
    if (!this.data?.isUploaded) {
      this.fileType = this.getFileType(this.file);
    }
    else {
      this.fileType = this.data.uploadedFile.fileType;
      this.file = this.viewFile(this.data.uploadedFile.file);
    }
  }
  getFileType(fileName) {
    return fileName?.split('.').pop().trim();
  }
  viewFile(file) {
    let src = URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustResourceUrl(src)
  }
}
