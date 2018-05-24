﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AlertService, AuthenticationService } from '../_services/index';
import { GlobalValues } from '../common/_common';
import { retry } from 'rxjs/operators/retry';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
// import { tempCapslockDirective } from '../_directives/tempcapslock.directive';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import { ToastrService } from 'ngx-toastr';
@Component({
  moduleId: module.id.toString(),
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  capslock: string;
  backgroundImage: any;
  alertmsg: boolean;
  logininfo: any = {};
  info: any;
  username: string;
  logininfostatus: boolean;
  container_detail: any[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private titleService: Title,
    private _cookieService: CookieService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private dialogService: DialogService,
  ) {
    this.backgroundImage = sanitizer.bypassSecurityTrustStyle(
      'url(../../assets/images/Ship.jpg)'
    );
  }

  ngOnInit() {
    this.alertmsg = false;
    // reset login status
     this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.titleService.setTitle(GlobalValues.loginTitle);

    this.info = this._cookieService.getObject("logininfo");

    this.model.username = this.info.username;
    this.model.password = this.info.password;
    if (this.info != null) {
      this.logininfostatus = true;
    }
  }


  showConfirm() {
    const disposable = this.dialogService.addDialog(ForgotPasswordComponent, {
      title: 'Forgot Password'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          // alert('accepted');
        }
        // tslint:disable-next-line:one-line
        else {
          // alert('declined');
        }
      });
    // We can close dialog calling disposable.unsubscribe();
    // If dialog was not closed manually close it by timeout
    setTimeout(() => {
      disposable.unsubscribe();
    }, 1200000);
  }
  login(remember) {
    this.loading = true;
    // this.router.navigate([this.returnUrl]);
    this.authenticationService
      .login(this.model.username, this.model.password)
      .subscribe(
        data => {
          if (data) {
            if (data === true) {
              this.container_detail = JSON.parse(localStorage.getItem('viewDetail')); 
              if(this.container_detail){
                this.authenticationService
                .checkCountry(this.container_detail['cntrY_ID'],this.model.username)
                .subscribe(
                  data1 =>{
                    if(data1 === true){
                      this.router.navigate(['/viewdetails/22']);
                    }else {
                      this.router.navigate(['/buycontainer']);
                    }
                  }
                )
               
                }else {
                this.router.navigate(['/buycontainer']);
              }
            
              GlobalValues.isLoggedIn = true;
              this.alertmsg = false;
            
            } else {
              this.toastr.error(data.message, 'Login');
              this.loading = false;
              this.alertmsg = true;
              return false;

            }
            if (remember.checked == true) {
              var expireDate = new Date(
                new Date().getTime() + 60 * 60 * 24 * 365 * 10
              );
              this.logininfo = {
                username: this.model.username,
                password: this.model.password
              };
              this._cookieService.putObject("logininfo", this.logininfo, {
                expires: expireDate
              });
            }
         
          }
        },
        error => {
          this.toastr.error(
            'There seems to be an issue with connectivity. Please contact the system administrator, if the problem persists.'
          );
          this.loading = false;
        }
      );
  }
}
