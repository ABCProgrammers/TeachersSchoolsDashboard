import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModalConfig, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./core/helpers/jwt.interceptor";
import { ErrorInterceptor } from "./core/helpers/error.interceptor";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { LayoutsModule } from "./layouts/layouts.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { LoginComponent } from "./login/login.component";
import { JwtModule } from "@auth0/angular-jwt";
import { CoreModule } from "./core/core.module";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
export function tokenGetter() {
  return localStorage.getItem("_token");
}
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    LayoutsModule,
    DashboardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //  allowedDomains: ["example.com"],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(configModal: NgbModalConfig, _datePicker: BsDatepickerConfig) {
    configModal.backdrop = "static";
    configModal.keyboard = false;
    configModal.centered = true;
    configModal.scrollable = true;
    _datePicker.containerClass = 'theme-default';
    _datePicker.isAnimated = true;
    _datePicker.dateInputFormat = 'YYYY-MM-DD';
    _datePicker.showClearButton = true;
    _datePicker.clearPosition = 'right'
  }
}
