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
export class ProductDetailService {

  constructor(private httpClient: HttpClient) { }

  private handleError (error) {
	  console.error('ApiService::handleError', error);
	  return Observable.throw(error);
  }

  getProductDetail(product_id): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}/cms/product/${product_id}`).pipe(
      map(res => {
      	//console.log(res); 
      	return res.data; }),
      catchError(error => this.handleError(error.message || error))
    );
  }

  
}