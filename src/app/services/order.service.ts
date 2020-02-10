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

  private handleError (error) {
    //console.error('ApiService::handleError', error);
    return throwError(error);
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
        return res.data; 
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
