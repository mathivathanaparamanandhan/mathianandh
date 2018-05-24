import { Component, OnInit,Input } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AlertService, UserService, ITradePortalService } from '../_services/index';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-forgot-password',
  templateUrl: './admin-forgot-password.component.html',
  styleUrls: ['./admin-forgot-password.component.scss']
})
export class AdminForgotPasswordComponent implements OnInit {
  model: any = {};
  blur = false;
  disabled = false;
  isUserValid: Boolean = false;
  @Input() f: NgForm;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private iTradePortalService: ITradePortalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }
  confirm(myForm: NgForm) {
    this.iTradePortalService.updateAdminPassword(this.model)
      .subscribe(
      data => {
        if (data['status'] === 'true') {
          this.toastr.clear();
          this.toastr.success(data['message'], 'Forgot Password',{ closeButton: true});
          this.isUserValid = false;
          this.disabled = true;
          myForm.resetForm();
        } else {
          this.toastr.clear();
          this.toastr.error(data['message'], 'Forgot Password');
        }
        // this.alertService.success("Password reset successfully")
        // this.result = true;
        // this.close();
      },
      Error => {
        this.toastr.error('Password rest failed Please Contact Admin', 'Forgot Password');
       });

    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code


  }

}
