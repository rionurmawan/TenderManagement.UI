import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  signUp(
    userRequest: any
  ): Observable<any> {

    return this.httpClient.post<any>(
      this.baseApiUrl + '/account/signup',
      userRequest
    );
  }

  signIn(
    credential: any
  ): Observable<any> {

    return this.httpClient.post<any>(
      this.baseApiUrl + '/account/signin',
      credential
    );
  }
}
