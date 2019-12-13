import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const headers: HttpHeaders = new HttpHeaders();

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
   headers.append( 'Authorization',`JWT ${access_token}` );

    return this.httpClient.get<any>(`${API_URL}/web/address`, {headers} )
    .pipe(
      map(res => {
        console.log(res);
        return res.data;
      }),
      catchError(error => this.handleError(error))
    );
  }

  public getAddress(user_id) {
  	return this.httpClient.get<any>(`${API_URL}/web/address/${user_id}`)
  	.pipe(
      map(res => {
        //console.log(res); 
        return res.data; }),  // make it as observable
      catchError(error => this.handleError(error.message || error))
    );
  }

  public addAddress(postAddress,user_id) {
    return this.httpClient.post<any>(`${API_URL}/web/address`, postAddress)
    .pipe(
      map(res => {console.log(res); return res.data; }),  // make it as observable
      catchError(error => this.handleError(error))
    );
  }

}
