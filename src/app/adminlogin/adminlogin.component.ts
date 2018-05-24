import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AlertService, AuthenticationService } from '../_services/index';
import { GlobalValues } from '../common/_common';
import { retry } from 'rxjs/operators/retry';
import { importExpr } from '@angular/compiler/src/output/output_ast';
// import { ForgotPasswordAdminComponent } from '../forgot-password-admin/forgot-password-admin.component';
import { CapslockDirective } from '../_directives/capslock.directive';
import {ToastrService } from 'ngx-toastr';
import { CookieService } from 'angular2-cookie/services';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  capslock: string;
  backgroundImage: any;
  adminuser: any = {};
  info: any;
  logininfostatus: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private titleService: Title,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'portaluserprofile';
    this.titleService.setTitle(GlobalValues.loginTitle);
    this.info = this._cookieService.getObject("adminuser");

    this.model.username = this.info.username;
    this.model.password = this.info.password;
    if (this.info != null) {
      this.logininfostatus = true;
    }
  }

  login(remember) {
    this.loading = true;
    //this.router.navigate([this.returnUrl]);
    this.authenticationService
      .Adminlogin(this.model.username, this.model.password)
      .subscribe(
        data => {
          if (data) {
            if (data === true) {
              this.router.navigate(['portaluserprofile']);
              GlobalValues.isLoggedIn = true;
            } else {
           

              this.toastr.error(data.message, 'Login');
              this.loading = false;
              return false;
            }
            if (remember.checked == true) {
              var expireDate = new Date(
                new Date().getTime() + 60 * 60 * 24 * 365 * 10
              );
              this.adminuser = {
                username: this.model.username,
                password: this.model.password
              };
              this._cookieService.putObject("adminuser", this.adminuser, {
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
