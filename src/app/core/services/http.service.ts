import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiUrls } from '../../shared/routes/apiUrl';
import { AppRoutes } from '../../shared/routes/appRoutes';
import { NgxSpinnerService } from 'ngx-spinner';
import { IApiResponse } from '../models/api-response';
import { HelperService } from './helper.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  appRoutes = AppRoutes;
  apiUrl = ApiUrls;
  constructor(private http: HttpClient, public _spinnerService: NgxSpinnerService, public _helperService: HelperService) { }
  get(api: string, masterApi?: string): Observable<IApiResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': '*', 'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': '*',
    });
    let options = { headers: headers };
    let baseUrl = environment.baseUrl;
    return this.http
      .get<IApiResponse>(baseUrl + api, { ...options })
      .pipe(map((response: any) => {
        if (typeof response == "string") {
          return this.JsonParseData(response);
        }
        else {
          return response;
        }
      }));
  }
  post(api: string, data: any, masterApi?: string): Observable<IApiResponse> {
    let headers = new HttpHeaders({
      ...(!(data instanceof FormData) && { 'Content-Type': 'application/json; charset=utf-8' }),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': '*'
    });
    let options = { headers: headers };
    // If data is a FormData object, send it directly; otherwise, stringify it
    const requestData = data instanceof FormData ? data : JSON.stringify(data);
    let baseUrl = environment.baseUrl;
    return this.http
      .post<IApiResponse>(baseUrl + api, requestData, { ...options }).pipe(map(response => {
        if (typeof response == "string") {
          return this.JsonParseData(response);
        }
        else {
          return response;
        }
      }));
  }
  public JsonParseData(data: any) {
    let result = data;
    try {
      result = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
    return result;
  }

}
