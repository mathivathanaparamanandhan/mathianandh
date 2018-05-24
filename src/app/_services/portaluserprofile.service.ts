import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { User } from '../_models/index';
@Injectable()
export class PortaluserprofileService {

  constructor(
    private http: HttpClient
  ) { }

  getPortalusers(mode) {
    return this.http.post(environment.apiUrl + 'PortalUser/GetPortalUserByStatus',{},
      { headers: new HttpHeaders().set('Content-Type', 'application/json'),params: new HttpParams().append('mode', mode) }
    )
      .map((res) => {
        return res;
      });
  }
  getProduct(): Observable<any> {
    //return this.http.get(`/spree/api/v1/products/${id}`)
    // return this.http.get(environment.apiLoc + "container_detail").map(res => {
      return this.http.get("assets/data.json").map(res => {
    return res;
    });
  }

}
