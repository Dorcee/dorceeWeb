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

	private handleError (res) {
		if (res.status === 400) {
            console.log(res.error);
			return throwError({status: false, message: res.error.data || res.error.error});
        } else {
			console.error('ApiService::handleError', res);
			return throwError(res);
        }
	}

	public registerUser(postData) {
		return this.httpClient.post<any>(`${API_URL}/web/register`, postData, {headers})
		.pipe(
			map(res => {console.log(res); return res.data; }),  // make it as observable
			catchError(error => this.handleError(error))
		);
	}

	public generateOtp(postData) {
		console.log(postData);
		return this.httpClient.post<any>(`${API_URL}/web/login`, postData, {headers})
		.pipe(
			map(res => {console.log(res); return res; }),
			catchError(error => this.handleError(error))
		);
	}

	public verifyOtp(postData) {
		console.log(postData);
		return this.httpClient.post<any>(`${API_URL}/web/otp/verify`, postData, {headers})
		.pipe(
			map(res => {console.log(res); return res; }),
			catchError(error => this.handleError(error))
		);
	}
}