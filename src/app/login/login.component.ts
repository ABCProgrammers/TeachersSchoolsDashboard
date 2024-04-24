
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TokenStorageService } from '../core/services/token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  unsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _tokenService: TokenStorageService,
    private jwtService: JwtHelperService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
      let redirectUrl = params['redirectUrl'];
      if (params?.['token']) {
        localStorage.clear();
        localStorage.setItem('redirectUrl', redirectUrl);
        this._tokenService.saveToken(params['token']);
        let data = this.jwtService.decodeToken(params['token']);
        this._tokenService.saveUser(data);
        this.router.navigateByUrl('/items-suppliers');
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
