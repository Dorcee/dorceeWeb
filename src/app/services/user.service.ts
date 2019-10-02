import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const headers = new HttpHeaders().set("Content-Type", "application/json");

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private httpClient: HttpClient) { }

	private handleError (error) {
		console.error('ApiService::handleError', error);
		return Observable.throw(error);
	}

	public registerUser(postData) {
		return this.httpClient.post<any>(`${API_URL}/web/register`, postData, {headers})
		.pipe(
			map(res => {console.log(res); return res.data; }),  // make it as observable
			catchError(error => this.handleError(error.message || error))
		);
	}

	public generateOtp(postData) {
		console.log(postData);
		return this.httpClient.post<any>(`${API_URL}/web/otp/generate`, postData, {headers})
		.pipe(
			map(res => {console.log(res); return res; }),  // make it as observable
			catchError(error => this.handleError(error.message || error))
		);
	}

	public verifyOtp(postData) {
		console.log(postData);
		return this.httpClient.post<any>(`${API_URL}/web/otp/verify`, postData, {headers})
		.pipe(
			map(res => {console.log(res); return res; }),  // make it as observable
			catchError(error => this.handleError(error.message || error))
		);
	}
}