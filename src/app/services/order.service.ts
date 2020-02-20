import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private httpClient: HttpClient) { }

  private handleError (res) {
    if (res.status === 400) {
      //console.error(res.error);
      return throwError({status: false, message: res.error.message || res.message});
    } else {
      //console.error('ApiService::handleError', error);
      return throwError(res);
    }
  }

  public getOrderDetails(data,access_token) {
    httpOptions.headers = httpOptions.headers.set( 'Authorization',access_token );
    //console.log(data);
    return this.httpClient.post<any>(`${API_URL}/web/order`, data, httpOptions)
    .pipe(
      map(res => {
        //console.log(res); 
        return res.data; 
      }),  // make it as observable
      catchError(error => this.handleError(error))
    );
  }

  public validateOrder(data,access_token) {
    httpOptions.headers = httpOptions.headers.set( 'Authorization',access_token );
    //console.log('data')
    //console.log(data)
    return this.httpClient.post<any>(`${API_URL}/web/validate/checksum`, data, httpOptions)
    .pipe(
      map(res => {
        //console.log(res); 
        return res.message; 
      }),  // make it as observable
      catchError(error => this.handleError(error))
    );
  }

  getPlacedOrderDetailsOfUser(access_token) {
    //console.log(access_token);
    httpOptions.headers = httpOptions.headers.set('Authorization',access_token);
    return this.httpClient.get<any>(`${API_URL}/web/user/order`, httpOptions)
    .pipe(
      map(res => { 
       // console.log(res);
        return res;
      }),
      catchError(error => this.handleError(error))
    );
  }

}
