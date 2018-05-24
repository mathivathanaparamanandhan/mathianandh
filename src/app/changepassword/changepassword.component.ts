import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AlertService, UserService, ITradePortalService } from '../_services/index';
import { ToastrService } from 'ngx-toastr';
export interface ConfirmModel {
  title: String;
}

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  model: any = {};
  form: any = {};
  username: string;
  title: String;
  isoldpassword: Boolean = false;
  constructor(dialogService: DialogService,
    private userService: UserService,
    private alertService: AlertService,
    private iTradePortalService: ITradePortalService,
    private toastr: ToastrService
  ) {
    super(dialogService);
  }

  submitPassword() {
    this.username = JSON.parse(localStorage.getItem('currentUser'));
    this.form.Username = this.username['username'];
    this.form.Password = this.model.oldpassword;
    this.form.NewPassword = this.model.newpassword;
    this.iTradePortalService.changePassword(this.form)
      .subscribe(data => {
        if (data['status'] === 'true') {
          this.toastr.clear();
          this.toastr.success(data['message'], 'Change Password',{ closeButton: true});
          this.isoldpassword = false;
        } else {
          this.toastr.clear();
          this.toastr.error(data['message'], 'Change Password');
        }
      },
        Error => {
          this.toastr.clear();
          this.toastr.error('There is an Error in changing password', 'Change Password');
          this.close();
        });
  }
  ngOnInit() {
  }

}
