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

export class AddressService {

  constructor(private httpClient: HttpClient) { }

  private handleError (error) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }

  getAllAddresses(access_token) {
    //console.log(access_token);
    httpOptions.headers=httpOptions.headers.set( 'Authorization',access_token );

    return this.httpClient.get<any>(`${API_URL}/web/address`, httpOptions )
    .pipe(
      map(res => {
        //console.log(res);
        return res.data;
      }),
      catchError(error => this.handleError(error))
    );
  }

  public EditAddress(updateAddressForm,access_token,address_id) {
    //console.log(access_token);
    console.log(address_id);
    httpOptions.headers=httpOptions.headers.set( 'Authorization',access_token );

  	return this.httpClient.put<any>(`${API_URL}/web/address/${address_id}`,updateAddressForm, httpOptions)
  	.pipe(
      map(res => {
        console.log(res); 
        return res.data; }),  // make it as observable
      catchError(error => this.handleError(error.message || error))
    );
  }

  public addAddress(postAddress,access_token) {
    //console.log(access_token);
    httpOptions.headers=httpOptions.headers.set( 'Authorization',access_token );

    return this.httpClient.post<any>(`${API_URL}/web/address`, postAddress, httpOptions)
    .pipe(
      map(res => {
        //console.log(res); 
        return res.data; 
      }),  // make it as observable
      catchError(error => this.handleError(error))
    );
  }

}
