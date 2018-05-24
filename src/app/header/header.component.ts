import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalValues } from '../common/_common';
import { DialogService } from 'ng2-bootstrap-modal';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { AdmnChangepasswordComponent } from '../admn-changepassword/admn-changepassword.component';
import { Router } from '@angular/router';

import { PlatformLocation } from "@angular/common";
import { BsModalService } from "ngx-bootstrap/modal";
import {
  AlertService,
  UserService,
  ITradePortalService
} from "../_services/index";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";


import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
export interface ConfirmModel {
  title: String;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  adminrole: boolean = false;
  userrole: boolean = false;
  modalRef: BsModalRef;
  model: any = {};
  form: any = {};
  isoldpassword: Boolean = false;
  title: String;
  protalusername: string;
  constructor(
    private dialogService: DialogService,
    private router: Router,
    private platformLocation: PlatformLocation,
    private modalService: BsModalService,
    private userService: UserService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private iTradePortalService: ITradePortalService
  ) { }
  ngOnInit() {

    console.log(this.platformLocation.pathname);
    if (this.platformLocation.pathname == "/iTradePortal/V10/UI/login" || this.platformLocation.pathname == "/iTradePortal/V10/UI/adminlogin") {
      console.log(this.platformLocation.pathname)
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentAdminUser");
    }
    // if (GlobalValues.isLoggedIn == true) {

    if (localStorage.getItem("currentUser")) {
      // this.show = true;
      this.userrole = true;
      this.isLoggedIn = true;

      var name: any = localStorage.getItem("currentUser");
      name = JSON.parse(name);
      this.username = name.username;
    } else if (localStorage.getItem("currentAdminUser")) {
      // this.show = true;
      this.adminrole = true;
      this.isLoggedIn = true;

      var name: any = localStorage.getItem("currentAdminUser");
      name = JSON.parse(name);
      this.username = name.username;
    } else {
      this.isLoggedIn = false;
    }
  }

  viewDropdown(): void {
    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn = true;
      this.userrole = true;
    }
    if (localStorage.getItem('currentAdminUser')) {
      this.isLoggedIn = true;
      this.adminrole = true;
    }
    // tslint:disable-next-line:curly
    if (localStorage.getItem('currentUser')) {

      this.isLoggedIn = true;
      let name: any = localStorage.getItem('currentUser');
      name = JSON.parse(name);
      this.username = name.username;
      this.userrole = true;
    }
    if (localStorage.getItem('currentAdminUser')) {
      this.isLoggedIn = true;
      let name: any = localStorage.getItem('currentAdminUser');
      name = JSON.parse(name);
      this.username = name.username;
      this.adminrole = true;
    }
  }

  logout() {
    GlobalValues.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAdminUser');
    this.userrole = false;
    this.adminrole = false;
  }
  showConfirm() {
    const disposable = this.dialogService.addDialog(ChangepasswordComponent, {
      title: 'Change Password'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          // alert('accepted');
        } else {
          // alert('declined');
        }
      });
    // We can close dialog calling disposable.unsubscribe();
    // If dialog was not closed manually close it by timeout
    setTimeout(() => {
      disposable.unsubscribe();
    }, 120000);
  }
  showConfirm1() {
    const disposable = this.dialogService.addDialog(AdmnChangepasswordComponent, {
      title: 'Admin Change Password'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          // alert('accepted');
        } else {
          // alert('declined');
        }
      });
    // We can close dialog calling disposable.unsubscribe();
    // If dialog was not closed manually close it by timeout
    // setTimeout(() => {
    //     disposable.unsubscribe();
    // }, 120000);
  }


  openUserProfile(): void {
    this.router.navigate(['/userprofile']);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  submitPassword(f: NgForm) {
    if (localStorage.getItem("currentAdminUser")) {
      this.protalusername = JSON.parse(
        localStorage.getItem("currentAdminUser")
      );
      this.form.PRTL_ADMN_USR_NAM = this.protalusername["username"];
      this.form.PRTL_ADMN_PSSWRD = this.model.oldpassword;
      // this.form.NewPassword = this.model.newpassword;
      this.iTradePortalService
        .adminchangePassword(this.form, this.model.newpassword)
        .subscribe(
          data => {
            if (data["status"] === "true") {
              this.toastr.success(data["message"], "Change Password");
              this.isoldpassword = false;
              f.resetForm();
            this.modalRef.hide();
              
            } else {
              this.toastr.error(data["message"], "Change Password");
              f.resetForm();
            }
          },
          Error => {
            this.toastr.error(
              "There is an Error in changing password",
              "Change Password"
            );
            f.resetForm();
          }
        );
    } else if (localStorage.getItem("currentUser")) {
      this.protalusername = JSON.parse(localStorage.getItem("currentUser"));
      this.form.Username = this.protalusername["username"];
      this.form.Password = this.model.oldpassword;
      this.form.NewPassword = this.model.newpassword;
      this.iTradePortalService.changePassword(this.form).subscribe(
        data => {
          if (data["status"] === "true") {
            this.toastr.clear();
            this.toastr.success(data["message"], "Change Password");
            this.isoldpassword = false;
            f.resetForm();
            this.modalRef.hide();
          } else {
            this.toastr.clear();
            this.toastr.error(data["message"], "Change Password");
            f.resetForm();
          }
        },
        Error => {
          this.toastr.clear();
          this.toastr.error(
            "There is an Error in changing password",
            "Change Password"
          );
          f.resetForm();
        }
      );
    }
  }
  clear(f: NgForm) {
    f.resetForm();
  }
}
