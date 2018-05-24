import { Component, OnInit,Input } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AlertService, UserService, ITradePortalService } from '../_services/index';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  model: any = {};
  title: string;
  message: string;
  msg: string;
  blur = false;
  disabled = false;
  isUserValid: Boolean = false;
  @Input() f: NgForm;
  constructor(dialogService: DialogService,
    private userService: UserService,
    private alertService: AlertService,
    private iTradePortalService: ITradePortalService,
    private toastr: ToastrService
  ) {
    super(dialogService);
  }
  confirm(myForm: NgForm) {
    this.iTradePortalService.updatePassword(this.model)
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
        this.close();
      });

    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code


  }
  ngOnInit() {

  }

}
