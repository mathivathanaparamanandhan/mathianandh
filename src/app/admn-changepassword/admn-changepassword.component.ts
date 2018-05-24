import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AlertService, UserService, ITradePortalService } from '../_services/index';
import { ToastrService } from 'ngx-toastr';
export interface ConfirmModel {
  title: String;
}
@Component({
  selector: 'app-admn-changepassword',
  templateUrl: './admn-changepassword.component.html',
  styleUrls: ['./admn-changepassword.component.scss']

})
export class AdmnChangepasswordComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  model: any = {};
  form: any = {};
  username: string;
  isoldpassword: Boolean = false;
  title: String;
  constructor(
    dialogService: DialogService,
    private userService: UserService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private iTradePortalService: ITradePortalService,
  ) {
    super(dialogService);
  }

  ngOnInit() {
  }

  submitPassword() {
    this.username = JSON.parse(localStorage.getItem('currentAdminUser'));
    this.form.PRTL_ADMN_USR_NAM = this.username['username'];
    this.form.PRTL_ADMN_PSSWRD = this.model.oldpassword;
    // this.form.NewPassword = this.model.newpassword;
    this.iTradePortalService.adminchangePassword(this.form, this.model.newpassword)
      .subscribe(data => {
        if (data['status'] === 'true') {
          this.toastr.success(data['message'], 'Change Password',{ closeButton: true});
          this.isoldpassword = false;
          this.close();
        } else {
          this.toastr.error(data['message'], 'Change Password');
        }
      },
        Error => {
          this.toastr.error('There is an Error in changing password', 'Change Password');
          this.close();
        });
  }


}
