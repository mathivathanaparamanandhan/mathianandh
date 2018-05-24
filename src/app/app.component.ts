import { Component, ViewChild } from '@angular/core';

import { HeaderComponent } from './header/header.component';

import '../assets/app.css';
import { GlobalValues } from './common/_common';
import { PlatformLocation } from '@angular/common';

@Component({
  moduleId: module.id.toString(),
  // tslint:disable-next-line:component-selector
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(HeaderComponent) private header: HeaderComponent;
  constructor(
    private platformLocation: PlatformLocation
  ) { }

  public onRouterOutletActivate(event: any) {
    if (this.platformLocation.pathname == "/iTradePortal/V10/UI/login" || this.platformLocation.pathname == "/iTradePortal/V10/UI/adminlogin") {
      GlobalValues.isLoggedIn = false;
      this.header.isLoggedIn = false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentAdminUser');
    }

    if (GlobalValues.isLoggedIn == true) {
      this.header.isLoggedIn = true;
      if (localStorage.getItem("currentUser")) {
        this.header.userrole = true;
        var name: any = localStorage.getItem("currentUser");
        name = JSON.parse(name);
        this.header.username = name.username;
      }
      if (localStorage.getItem("currentAdminUser")) {
        this.header.adminrole = true;
        var name: any = localStorage.getItem("currentAdminUser");
        name = JSON.parse(name);
        this.header.username = name.username;
      }
    }
    if (this.platformLocation.pathname == "/iTradePortal/V10/UI/userdetail" || this.platformLocation.pathname == "/iTradePortal/V10/UI/portaluserprofile") {
      // localStorage.removeItem('userdetail') /iTradePortal/V7/UI/adminlogin
    }
    else {
      localStorage.removeItem('userdetail')
    }
    if (this.platformLocation.pathname == "/iTradePortal/V10/UI/availability" || this.platformLocation.pathname == "/iTradePortal/V10/UI/" || this.platformLocation.pathname == "/iTradePortal/V9/ui/" ) {
      localStorage.removeItem('viewDetail')
      console.log(this.platformLocation.pathname);
    } else {
console.log(this.platformLocation.pathname);
// /iTradePortal/V6/UI
    }
    
  }
}
