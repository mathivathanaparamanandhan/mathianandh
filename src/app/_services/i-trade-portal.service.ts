import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, ResponseContentType } from "@angular/http";
import "rxjs/Rx";
import { Response } from "@angular/http";
@Injectable()
export class ITradePortalService {

  constructor(
    private http: HttpClient,
    private https: Http
  ) { }

  updateAdminPassword(model) {
    const body = JSON.stringify(model);
    return this.http
      .post(environment.apiUrl + 'PortalUser/ValidateAdminByEmailID', body,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map((res) => {
        return JSON.parse(res.toString());
      });
  }
  adminchangePassword(form, newpassword: string) {
    const body = JSON.stringify(form);
    return this.http
      .post(environment.apiUrl + 'PortalUser/ValidateAdminPassword', body,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().set('newPassword', newpassword),
        }
      )
      .map((res) => {
        return JSON.parse(res.toString());
      });
  }
  updatePassword(model) {
    const body = JSON.stringify(model);
    return this.http
      .post(environment.apiUrl + 'PortalUser/ValidateUserByEmailID', body,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map((res) => {
        return JSON.parse(res.toString());
      });
  }
  changePassword(form) {
    const body = JSON.stringify(form);
    return this.http
      .post(environment.apiUrl + 'PortalUser/ValidatePassword', body,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().set('newPassword', form.NewPassword),
        }
      )
      .map((res) => {
        return JSON.parse(res.toString());
      });
  }
  getCurrency() {
    return this.http.get(environment.apiUrl + 'PortalUser/GetCurrency',
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return res;
      });
  }
  getAllCountry() {
    return this.http.get(environment.apiUrl + 'PortalUser/GetAllCountry',
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return res;
      });
  }
  userRegistration(model) {
    delete model.recapcha;
    delete model.selectedCurrency;
    delete model.selectedCountry;
    const body = JSON.stringify(model);
    return this.http
      .post(environment.apiUrl + 'PortalUser/RegisterUser', body,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map((res) => {
        return JSON.parse(res.toString());
      });
  }
  isUserNameUnique(model) {
    const body = JSON.stringify(model);
    return this.http
      .post(environment.apiUrl + 'PortalUser/checkUserExist', body,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map((res) => {
        return JSON.parse(res.toString());
      });
  }
  getPortalusers(mode) {
    return this.http.post(environment.apiUrl + 'PortalUser/GetPortalUserByStatus', {},
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().append('mode', mode) }
    )
      .map((res) => {
        return res;
      });
  }
  getOverviewDetails(frmDate: Date, toDate: Date) {
    return this.http.post(environment.apiUrl + 'PortalUser/GetOverviewDetails', { FRM_DATE: frmDate, TO_DATE: toDate },
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return res;
      });
  }
  getUserDetailsByID(userid) {
    return this.http.post(environment.apiUrl + 'PortalUser/GetPortalUser', {},
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().append('userid', userid) }
    )
      .map((res) => {
        return res;
      });
  }
  getAllLookupValues(userid) {
    return this.http.post(environment.apiUrl + 'PortalUser/GetAllLookups', {},
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().append('userid', userid) }
    )
      .map((res) => {
        return res;
      });
  }
  getPortalUserCNTRY(userid) {
    return this.http.post(environment.apiUrl + 'PortalUser/GetPortalUserCountryByID', {},
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().append('userid', userid) }
    )
      .map((res) => {
        return res;
      });
  }
  getStatusLKP(status) {
    return this.http.post(environment.apiUrl + 'PortalUser/GetUserStatus', {},
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().append('status', status) }
    )
      .map((res) => {
        return res;
      });
  }
  updatePortalUserDetails(user) {
    const body = JSON.stringify(user);

    return this.http.post(environment.apiUrl + 'PortalUser/UpdatePortalUserProfile', body,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return JSON.parse(res.toString());
      });
  }
  getProduct(): Observable<any> {
    //return this.http.get(`/spree/api/v1/products/${id}`)
    // return this.http.get(environment.apiLoc + "container_detail").map(res => {
    return this.http.get("assets/data.json").map(res => {
      return res;
    });
  }
  getUserdetail(model) {
    const body = JSON.stringify(model);
    return this.http.post(environment.apiUrl + 'PortalUser/GetUserProfile', body,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return res;
      });
  }
  updateUserprofile(model) {
    const body = JSON.stringify(model);
    return this.http.post(environment.apiUrl + 'PortalUser/UpdateProfile', body,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return JSON.parse(res.toString());
      });
  }
  getOrderDetails(username) {
    return this.http.post(environment.apiUrl + 'Container/GetOrderDetails', {},
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().append('username', username) }
    )
      .map((res) => {
        return res;
      });
  }
  createCartList(cartList, username) {
    return this.http.post(environment.apiUrl + 'Container/createCart', cartList,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().set('username', username) }
    )
      .map((res) => {
        return JSON.parse(res.toString());
      });

    //GlobalValues.cartDetail.push(cartList);
  }

  getCartList(username) {
    return this.http.post(environment.apiUrl + 'Container/getCartDetails', {},
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().set('username', username) }
    )
      .map((res) => {
        return res;
      });
  }

  removeCartItem(model) {
    return this.http.post(environment.apiUrl + 'Container/removeCart', model,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return JSON.parse(res.toString());
      });
    //GlobalValues.cartDetail.splice(id,1)
  }

  createSaleCart(cartList, username) {
    return this.http.post(environment.apiUrl + 'Container/createSaleCart', cartList,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().set('username', username) }
    )
      .map((res) => {
        return JSON.parse(res.toString());
      });

  }
  public getFile(path: string): Observable<Blob> {
    let options = new RequestOptions({
      responseType: ResponseContentType.Blob
    });
    return this.https
      .get(path, options)
      .map((response: Response) => <Blob>response.blob());
  }
  getAdminUserDetails() {
    return this.http.post(environment.apiUrl + 'PortalUser/GetAdminUserDetails', {},
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return res;
      });
  }
  createAdminUser(AdminDetails) {
    return this.http.post(environment.apiUrl + 'PortalUser/CreateAdminUser', AdminDetails,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return JSON.parse(res.toString());
      });

  }

  updateAdminUser(AdminDetails) {
    return this.http.post(environment.apiUrl + 'PortalUser/UpdateAdminUser', AdminDetails,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
      .map((res) => {
        return JSON.parse(res.toString());
      });

  }

}
