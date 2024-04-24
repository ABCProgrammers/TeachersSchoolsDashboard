import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TableAdvancedComponent } from './components/table-advanced/table-advanced.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ViewFileComponent } from './components/view-file/view-file.component';
import { ViewUploadedFileComponent } from './components/view-uploaded-file/view-uploaded-file.component';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InLargeViewModalComponent } from './components/in-large-view-modal/in-large-view-modal.component';
import { sharedDirectives } from "./directives/directive-export";
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { ShowAttachmentsComponent } from './components/show-attachments/show-attachments.component';
@NgModule({
  declarations: [
    TableAdvancedComponent,
    ViewFileComponent,
    ViewUploadedFileComponent,
    ModalMessageComponent,
    ConfirmModalComponent,
    NotFoundComponent,
    InLargeViewModalComponent,
    [...sharedDirectives],
    ValidationErrorComponent,
    ShowAttachmentsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    TableAdvancedComponent,
    NgSelectModule,
    BsDatepickerModule,
    ViewFileComponent,
    ViewUploadedFileComponent,
    ModalMessageComponent,
    ConfirmModalComponent,
    InLargeViewModalComponent,
    [...sharedDirectives],
    ShowAttachmentsComponent,
    ValidationErrorComponent
  ],
  providers: [
    DatePipe,
    DecimalPipe,
  ]
})
export class SharedModule { }
