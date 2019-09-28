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
	return Observable.throw(error);
  }

  public getAllProducts() {
  	return this.httpClient.get<any>(`${API_URL}/cms/product?is_sort="newest"`, {headers})
  	.pipe(
       map(res => {console.log(res); return res.data; }),  // make it as observable
       catchError(error => this.handleError(error.message || error))
    );
   // .pipe(map(res => res.json()));
  }

  public createTodo(todo) {
    // will use this.http.post()
  }
}