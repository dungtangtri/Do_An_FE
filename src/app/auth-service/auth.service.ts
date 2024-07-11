import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from "../util/shared/API";
import {ResendVerificationLinkRequest} from "../login/models/resend-verification-link-request";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      API.AUTH_API+ 'signin',
      {
        username,
        password,
      },
      httpOptions,
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      API.AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions,
    );
  }

  logout(): Observable<any> {
    return this.http.post(API.AUTH_API + 'signout', {}, httpOptions);
  }

  resendVerificationLink(request: ResendVerificationLinkRequest) {
    return this.http.post(
      API.AUTH_API + 'resend-verification-link', request,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      }

    )
  }
}
