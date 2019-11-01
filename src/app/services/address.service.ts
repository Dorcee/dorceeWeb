import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  private handleError (error) {
	  console.error('ApiService::handleError', error);
	  return Observable.throw(error);
  }

  public addAddress(postAddress,user_id) {
  	return this.httpClient.post<any>(`${API_URL}/web/address/${user_id}`, postAddress)
  	.pipe(
  		map(res => {console.log(res); return res.data; }),  // make it as observable
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

}
