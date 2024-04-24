import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../core/services/header.service';
import { HttpService } from '../../core/services/http.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { SelectLocationComponent } from './components/select-location/select-location.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  formGroup: FormGroup;
  userDetails: any;
  instituteTypes = [{ text: 'ABC', value: 'ABC' }, { text: 'ABC', value: 'ABC' }]
  constructor(
    private _httpService: HttpService,
    private _tokenService: TokenStorageService,
    public headerService: HeaderService,
    private fb: FormBuilder,
    private _modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.headerService.setTitle('Profile');
    this.initForm();
    //this.getUserDetails();
  }

  initForm() {
    this.formGroup = this.fb.group({
      userId: '',
      fullName: [{ value: '', disabled: true }, [Validators.required]],
      mobile: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
    });
  }
  selectLocation() {
    const modalRef = this._modalService.open(SelectLocationComponent, { size:'lg'});
    modalRef.componentInstance.data = {};
  }

  getUserDetails() {
    this._httpService._spinnerService.show();
    this._httpService.get(this._httpService.apiUrl.User.GetUserDetails + `?userId=${this._tokenService.getUser.nameid}`).subscribe({
      next: (response) => {
        this.userDetails = response.data;
        let obj = {
          fullName: this.userDetails?.fullName,
          mobile: this.userDetails?.mobile,
        }
        this.f.patchValue(obj);
      }
    }).add(() => this._httpService._spinnerService.hide())
  }
  get f() {
    return this.formGroup;
  }
}
