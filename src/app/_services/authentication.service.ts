import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import { toArray } from "rxjs/operator/toArray";
import { retry } from "rxjs/operator/retry";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  statusCode: any = {
    code: String,
    message: String
  };
  login(username: string, password: string) {
    return this.http
      .post(
        environment.apiUrl + 'PortalUser/Login',
        { Username: username, Password: password },
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map(token => {
        // login successful if there's a jwt token in the response
        this.statusCode = token;
        if (this.statusCode.code === '001') {
          return this.statusCode;
        }
        if (token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ username: username, token: token })
          );
          return true;
        }
        return false;
      });
  }
  checkCountry(cntry_id:any ,username:string){

return this.http.post(
  environment.apiUrl + 'PortalUser/CheckCountry',
  { country_ID: cntry_id,Username:username },
  { headers: new HttpHeaders().set('Content-Type', 'application/json') }

).map( 
  data => {
    if (data === "true"){
      return true;
    } else {

      return false;
    }

    });
  }

  Adminlogin(username: string, password: string) {
    return this.http
      .post(
        environment.apiUrl + 'PortalUser/AdminLogin',
        { PRTL_ADMN_USR_NAM: username, PRTL_ADMN_PSSWRD: password },
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map(token => {
        // login successful if there's a jwt token in the response
        this.statusCode = token;
        if (this.statusCode.code === '001') {
          return this.statusCode;
        }
        if (token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            'currentAdminUser',
            JSON.stringify({ username: username, token: token })
          );
          return true;
        }
        return false;
      });
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentAdminUser');
  }
}
