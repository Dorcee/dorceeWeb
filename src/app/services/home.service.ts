import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const headers = new HttpHeaders();

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
	//.set("X-CustomHeader", "custom header value");

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }
  
  locType = localStorage.getItem('loc_type');
  params = new HttpParams().set('loc_type', this.locType);

  private handleError (error) {
	 // console.error('ApiService::handleError', error);
	  return throwError(error);
  }

  public getAllProducts(isChecked, key='', value='') {
    // console.log(isChecked);
    // console.log(key);
    // console.log(value);
    if(key == '' || value == '') {
      this.params = this.params.set('loc_type', this.locType);
      this.params = this.params.set('is_sort','newest');     
    } else if(key == 'viewAll' || value == 'viewAll') {
      //this.params = this.params.set('loc_type', this.locType);
      if(isChecked ==  false) {
        this.params = this.params.delete('is_sort','newest');
      } else {
        this.params = this.params.delete('type');
        this.params = this.params.set('is_sort','newest');
      }      

    } else {
      this.params = this.params.delete('is_sort','newest');
      if(isChecked ==  false) {
        this.params = this.params.delete(key,value);
      } else {
        this.params = this.params.set(key,value);
      }      
    }
    var params = this.params;
    //console.log(params);
  	return this.httpClient.get<any>(`${API_URL}/web/product`, {params, headers})
  	.pipe(
      map(res => {
        return res.data; }),  // make it as observable
      catchError(error => this.handleError(error.message || error))
    );
  }

  getAllProductsForHomePage( key='', value='') {
    this.params = this.params.delete('type');
    this.params = this.params.delete('fit');
    this.params = this.params.delete('size');
    var paramsHome = new HttpParams().set(key, value);
    paramsHome = this.params.set('is_sort','newest');     
    //console.log(paramsHome);
    return this.httpClient.get<any>(`${API_URL}/web/product`, {params:paramsHome, headers})
    .pipe(
      map(res => {
        return res.data; }),  // make it as observable
      catchError(error => this.handleError(error.message || error))
    );
  }

  getAllBanners() {
    return this.httpClient.get<any>(`${API_URL}/banner`).pipe(
      map(res => {
        return res;
        //console.log(res);
      }),
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

  public getCountryFromIp() {
    var url = 'http://ip-api.com/json';
    return this.httpClient.get<any>(url)
      .pipe(
      map(res => {
       // console.log(res); 
        return res; }),  // make it as observable
      catchError(error => this.handleError(error.message || error))
    );
  }

  public emailSubscribe(formData) {
    //console.log(formData);
   
    return this.httpClient.post<any>(`${API_URL}/web/subscribe`, formData, httpOptions)
    .pipe(
      map(res => {
        return res;
      }),
      catchError(error => this.handleError(error.message || error))
    )
  }
}