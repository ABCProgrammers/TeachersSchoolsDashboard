import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, catchError, forkJoin, of } from 'rxjs';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';
import { HttpService } from '../../core/services/http.service';
@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent {
  formGroup: FormGroup;
  instituteTypes = [{ text: 'ABC', value: 'ABC' }, { text: 'ABC', value: 'ABC' }]

  constructor(
    private fb: FormBuilder,
    public _httpService: HttpService,
    public _modalService: NgbModal,
  ) { }
  ngOnInit() {
    this.initForm();
    this.getLookups();
  }
  getLookups() {
    const type = this._httpService.get(`${this._httpService.apiUrl.Lookups}?status=1001&pageSize=1000`).pipe(catchError(error => of(error)));
    const lookup = this._httpService.get(`${this._httpService.apiUrl.Lookups}?status=1001&pageSize=1000`).pipe(catchError(error => of(error)));
    forkJoin([type, lookup]).subscribe((data) => {
    });
  }
  initForm() {
    this.formGroup = this.fb.group({
    })

  }
  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return
    }
    let formData = new FormData();
    let value = this._httpService._helperService.trim(this.formGroup.value);
    this._httpService._spinnerService.show();
    let url: Observable<any>;
      //url = this._httpService.post(this._httpService.apiUrl.Lookup.EditLookup, formData);//EDIT
    url.subscribe({
      next: response => {
        if (response.isSuccess) {
          this.responseModal('success', 'Lookup been saved successfully');
        }
      },
      error: err => {
        console.log(err)
        this.responseModal('error', err[0].errorMessageEn || err[0].ErrorMessageEn);
      }
    }).add(() => { this._httpService._spinnerService.hide() })
  }
  responseModal(type, message) {
    const ref = this._modalService.open(ModalMessageComponent);
    ref.componentInstance.type = type;
    ref.componentInstance.message = message;
  }
  toggleEdit() {
    this.formGroup.enable();
  }
  get f() {
    return this.formGroup;
  }
}
