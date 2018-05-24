import { Component, OnInit,ViewChild } from '@angular/core';
import {Http, Response} from '@angular/http';
import { MatSidenav } from '@angular/material/sidenav';
import {TableModule} from 'primeng/table';
import { GlobalValues } from '../common/_common';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { AdmnChangepasswordComponent } from '../admn-changepassword/admn-changepassword.component';
import { PortaluserprofileService } from '../_services/index';
import { UserdetailService } from '../_services/index';
import { ITradePortalService } from "../_services/index";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adminuserprofile',
  templateUrl: './adminuserprofile.component.html',
  styleUrls: ['./adminuserprofile.component.scss']
})

export class AdminuserprofileComponent  {
  disableUserDetail: boolean=false;
  public data: Array<any> = [];
  isLoggedIn: boolean;
  username: string;
  selectedCars1: any[];
  cars: any = [];
  cars1: any = [];
  cols: any[];
 output:any=[];
 model: any = {};
 AdminUser:any={};
 dropdownSettings = {};
 selectedUserType:any = [];
 dropdownList = [];
 dropdownListRole = [];
 selectedRole = [];
 dropdownSettingsRole = {};
  mode = new FormControl('over');
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(private http: Http,
    private dialogService: DialogService,
    private userdetail: UserdetailService,
    private portaluserprofile: PortaluserprofileService,
    private itradeportalservice: ITradePortalService,
    private toastr: ToastrService) { 
      
    }
    register(f:NgForm)
    {
    this.AdminUser.PRTL_ADMN_USR_NAM=f.value.Username;
    this.AdminUser.PRTL_ADMN_EML_ID=f.value.EmailID;
    this.AdminUser.PRTL_ADMN_PSSWRD=f.value.Password;
    this.AdminUser.PRTL_ADMN_FRST_NAM=f.value.firstname;
    this.AdminUser.PRTL_ADMN_USR_TYP=f.value.UserType[0].id;
    this.AdminUser.RL_ID=f.value.RoleCode[0].id;
      this.AdminUser.PRTL_ADMN_CRTD_BY=this.username;
     this.AdminUser.PRTL_ADMN_LST_NAM=f.value.lastname;
     this.AdminUser.PRTL_ADMN_MDFD_DT=Date.now;
     if (f.value.active){
      this.AdminUser.PRTL_ADMN_ACTV_BT=f.value.active;
     }else{
      this.AdminUser.PRTL_ADMN_ACTV_BT=false;
     }
if(f.value.Username ) {

  this.itradeportalservice.createAdminUser(this.AdminUser).
  subscribe(
    data=>{
     if (data['status'] === 'true') {
       this.toastr.clear();
       this.toastr.success(data['message'], '',{ closeButton: true});
       this.onClientBind();
       } else {
       this.toastr.clear();
       this.toastr.error(data['message'], '');
     }
    },
    Error => {
     this.toastr.clear();
     this.toastr.error('There is an Error in Creating User Details Please contact Administrator', '');
   }
  );

 } else {
      this.AdminUser.PRTL_ADMN_USR_ID=this.model.PRTL_ADMN_USR_ID;
      this.itradeportalservice.updateAdminUser(this.AdminUser).
          subscribe(
            data=>{
             if (data['status'] === 'true') {
               this.toastr.clear();
               this.toastr.success(data['message'], '',{ closeButton: true});
               this.onClientBind();
               } else {
               this.toastr.clear();
               this.toastr.error(data['message'], '');
             }
            },
            Error => {
             this.toastr.clear();
             this.toastr.error('There is an Error in Updating User Details Please contact Administrator', '');
           }
          );
   
    }
      console.log(this.AdminUser);
      this.output=f.value;
     console.log(this.output); 
      console.log(f.valid);
    }
    ngOnInit(){
      this.disableUserDetail=false;
      this.dropdownList = [
        {"id":1,"itemName":"Admin"},
        {"id":2,"itemName":"SuperAdmin"}];
        this.dropdownListRole = [
          {"id":1,"itemName":"Branch Admin"},
          {"id":2,"itemName":"Super Admin"}];
          var name: any = localStorage.getItem("currentAdminUser");
          name = JSON.parse(name);
          this.username = name.username;
          this.onClientBind();
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Select Role',
      enableSearchFilter: false,
      classes: 'myclass custom-class',
      enableCheckAll: false,
      maxHeight: 300,
      showCheckbox: false,
  };
  this.dropdownSettingsRole = {
    singleSelection: true,
    text: 'Select User Type',
    enableSearchFilter: false,
    classes: 'myclass custom-class',
    enableCheckAll: false,
    maxHeight: 300,
    showCheckbox: false,
};

  }
  onRowSelect(data:any){
    console.log(data);
    this.model.Username=data.data.prtL_ADMN_USR_NAM;
    this.model.EmailID=data.data.prtL_ADMN_EML_ID;
    this.model.Password=data.data.prtL_ADMN_PSSWRD;
    this.model.repassword=data.data.prtL_ADMN_PSSWRD;
    this.model.firstname=data.data.prtL_ADMN_FRST_NAM;
    this.model.lastname=data.data.prtL_ADMN_LST_NAM;
    this.model.selectedRole=this.dropdownListRole.filter(usertype => usertype.id===data.data.rL_ID);
    this.model.selectedUserType= this.dropdownList.filter(usertype => usertype.id===data.data.prtL_ADMN_USR_TYP);        
    this.model.active=data.data.prtL_ADMN_ACTV_BT;
    this.model.PRTL_ADMN_USR_ID=data.data.prtL_ADMN_USR_ID;
    this.disableUserDetail=true;
    console.log(data);

  }

  onClientBind(){
    this.itradeportalservice.getAdminUserDetails().subscribe((data) => {
      this.cars = data;
        for (let i in data) {
          this.data[i]=data[i];
  
        }
       
        this.cols = [
          { field: 'prtL_ADMN_USR_NAM', header: 'User Name' },
          { field: 'prtL_ADMN_FRST_NAM', header: 'First Name' },
          { field: 'prtL_ADMN_LST_NAM', header: 'Last Name' }, 
          { field: 'prtL_ADMN_EML_ID', header: 'Email ID' },
         { field: 'prtL_ADMN_ACTV_BT', header: 'Active' },
        ];
       
      });
  }
  reset(){
    this.disableUserDetail=false;
  }


}
 
    

