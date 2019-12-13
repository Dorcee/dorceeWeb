import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const headers = new HttpHeaders();
	//.set("X-CustomHeader", "custom header value");

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  private handleError (error) {
	  console.error('ApiService::handleError', error);
	  return throwError(error);
  }

  public getAllProducts(key='', value='') {
    var loc_type = localStorage.getItem('loc_type');
    var params = {'loc_type' : loc_type};  //TODO : dynamic
    if(key == '' || value == '') {
      params['is_sort'] = 'newest';
    } else {
      params[key] = value;
    }
  	return this.httpClient.get<any>(`${API_URL}/web/product`, {params, headers})
  	.pipe(
      map(res => {
        return res.data; }),  // make it as observable
      catchError(error => this.handleError(error.message || error))
    );
  }

  public getAllEntities(postData) {
    return this.httpClient.post<any>(`${API_URL}/cms/entity`, postData, {headers})
    .pipe(
      map(res => {
        //console.log(res); 
        return res.data; }),  // make it as observable
      catchError(error => this.handleError(error.message || error))
    );
  }

  getCountryFromIp() {
    var url = 'http://ip-api.com/json';
    return this.httpClient.get<any>(url)
      .pipe(
      map(res => {
        //console.log(res); 
        return res; }),  // make it as observable
      catchError(error => this.handleError(error.message || error))
    );
}
}