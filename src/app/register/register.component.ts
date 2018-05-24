﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { GlobalValues } from '../common/_common';
import { retry } from 'rxjs/operators/retry';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { CapslockDirective } from '../_directives/capslock.directive';
import {ToastrService } from 'ngx-toastr';
@Component({
  moduleId: module.id.toString(),
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private titleService: Title,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.titleService.setTitle(GlobalValues.registrationTitle);
  }

  register() {
    this.loading = true;
    this.userService.create(this.model).subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
}
