import { Injectable } from "@angular/core";
import { HttpClient,HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";
import { saveAs } from 'file-saver/FileSaver';
import { Response } from '@angular/http';
import {ITradePortalService} from "../_services/index";
import { GlobalValues } from '../common/_common'
@Injectable()
export class ContainerService {
  constructor(
    private http: HttpClient,
    private ITradePortalService:ITradePortalService
  ) {}
  cartDetail:Array<any> = [];
  getFilter(): Observable<any> {
    return this.http.get(environment.apiUrl + "filter_title").map(res => {
      return res;
    });
  }
  getProduct(): Observable<any> {
    //return this.http.get(`/spree/api/v1/products/${id}`)
    return this.http.get(environment.apiUrl + "container_detail").map(res => {
      return res;
    });
  }

  getItems(): Observable<any> {
    //return this.http.get(`/spree/api/v1/products/${id}`)
    return this.http.get(environment.apiUrl + "item_data").map(res => {
      return res;
    });
  }
  getReport(){
    return ("..\..assets\images\PerDiem20180305114631668.pdf")
  }
  getProduct1(username): Observable<any>{
    return this.http.post(environment.apiUrl + 'Container/GetReadyToSale',{},
    { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().set('username', username) }
  )
    .map((res) => {
      return res;
    });
  }

  setCartList(cartList:any): void{
    GlobalValues.cartDetail.push(cartList);
  }
  
  getCartList(): Array<any>{
    return GlobalValues.cartDetail;
  }

  removeCartItem(id:number){
    GlobalValues.cartDetail.splice(id,1)
  }
}


















