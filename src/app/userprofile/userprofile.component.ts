import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService, ITradePortalService } from '../_services/index';
import { forEach } from '@angular/router/src/utils/collection';
import { concat } from 'rxjs/observable/concat';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit, OnChanges {
  model: any = {};
  loading = false;
  currencies: any = [];
  countries: any = [];
  dropdownList = [];
  selectedCurrency = [];
  dropdownSettings = {};
  countryDropdownSettings = {};
  capchaValue: string;
  number_container: number = 0;
  cntry_id: any = [];
  currencyId: string;
  model2: any = {};
  disableUserDetail = true;
  cPassword: string;
  mode = 'new';
  username: string;
  currency: any = [];
  country: any = [];
  @Input() f: NgForm;
  // countries: any = [];
  selectedCountry: any = [];
  inituser: any = {};
  afterup: any;
  preCurrencyId: any;
  updCurrencyId: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private iTradePortalService: ITradePortalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.disableUserDetail = true;
    this.username = JSON.parse(localStorage.getItem('currentUser'));
    this.model.Username = this.username['username'];

    this.iTradePortalService.getUserdetail(this.model)
      .subscribe(
        data1 => {
          const user = data1;
          this.iTradePortalService.getCurrency()
            .subscribe(
              data => {
                for (let i in data) {
                  this.currencies[i] = data[i];
                  this.currencies[i].id = data[i].currencyId;
                  this.currencies[i].itemName = data[i].currencyCode;
                  this.currencies[i].itemCode = data[i].currencyName;
                }
                this.selectedCurrency = this.currencies.filter(currrency => currrency.currencyId === user[0].prefferedCurrency);
                this.preCurrencyId = user[0].prefferedCurrency
                for (let j in user[0]['portalUserCountryView']) {
                  this.country.push(user[0]['portalUserCountryView'][j].cntrY_NAM,"\n");
                  this.country.slice(',')
                 // this.country.push("\n");
                }
                this.model.UserCountryName = this.country;
                this.number_container=this.country.length;
                this.rebindValues(user);
              }
            );
        }

      );



    this.dropdownSettings = {
      singleSelection: true,
      text: 'Select Currency',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll: false,
      maxHeight: 300,
      showCheckbox: false
    };
  }
  onSelect(countryId) {
    this.selectedCountry = null;
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].countryId === countryId) {
        this.selectedCountry = this.countries[i];
      }
    }
  }
  // updateUser(myForm: NgForm) {
  //   this.toastr.remove(1);
  //   this.toastr.clear();
  //   if (myForm.pristine  ) {
  //     this.toastr.clear();
  //     this.toastr.remove(1);
  //     this.toastr.info('No Changes to save', 'Profile');
  //   } else {
  //     const userData = this.model;
  //     if (this.selectedCurrency.length > 0) {
  //       this.model2 = this.selectedCurrency;
  //       this.model.currencyId = this.model2[0].currencyId;
  //       this.currency = this.selectedCurrency;
  //       this.model2 = this.selectedCurrency;
  //       this.model.PrefferedCurrency = this.model2[0].currencyId;
  //     }

  //     this.userprofile.updateUserprofile(userData)
  //       .subscribe(
  //         data => {
  //           if (data['status'] === 'true') {
  //             this.toastr.clear();

  //           //  localStorage.setItem('userData',JSON.stringify(this.model));
  //            // myForm.resetForm();
  //           //  this.model = JSON.parse(localStorage.getItem('userData'));
  //           //  this.rebindValues1(this.model); 
  //             this.toastr.success('Details updated Successfully', 'Profile');

  //           } else {
  //             this.toastr.clear();
  //             this.toastr.error('updated Failed', 'Profile');
  //           }
  //         }
  //       );
  //   }
  // }

  updateUser() {
    // delete this.model.currencyId;
    // delete this.model.PrefferedCurrency;
    var updvalue: any = this.model
   // delete updvalue.UserCountryName;
    delete updvalue.preCurrencyId;
   // delete updvalue.currencyId;
    //delete updvalue.PrefferedCurrency;
    //delete updstr.PrefferedCurrency;
    var initstr: string = JSON.stringify(this.inituser);
    var updstr: string = JSON.stringify(updvalue);
    if (initstr == updstr) {
      this.toastr.info("No Changes to save", "Profile",{ closeButton: true});
    } else {
      const userData = this.model;
      if (this.selectedCurrency.length > 0) {
        this.model2 = this.selectedCurrency;
        this.model.currencyId = this.model2[0].currencyId;
        this.currency = this.selectedCurrency;
        this.model2 = this.selectedCurrency;
        this.model.PrefferedCurrency = this.model2[0].currencyId;
      }
      this.afterup = userData;
      this.iTradePortalService.updateUserprofile(userData).subscribe(data => {
        if (data["status"] === "true") {
          this.toastr.clear();

          this.toastr.success("Details updated Successfully", "Profile",{ closeButton: true});
          this.rebindValuesaftupd(userData);
          this.updCurrencyId = this.model2[0].currencyId
        } else {
          this.toastr.clear();
          this.toastr.error("updated Failed", "Profile");
        }
      });
    }
  }

  rebindValues1(user): void {
    this.model.Username = user.Username;

  }
  rebindValues(user): void {
    this.model.Username = user[0].username;
    this.model.UserCustomerName = user[0].userCustomerName;
    this.model.UserAddress = user[0].userAddress;
    this.model.UserPhoneNo = user[0].userPhoneNo;
    this.model.EmailID = user[0].emailID;
    this.model.UserCountryName = this.country;
    // this.selectedCurrency = this.currencies.filter(currrency => currrency.currencyId === user[0].prefferedCurrency);
    this.model.UserCityName = user[0].userCityName;
    this.model.UserContactPerson = user[0].userContactPerson;
    this.model.UserComments = user[0].userComments;
    this.model.PrefferedCurrency = user[0].prefferedCurrency


    this.inituser = {
      Username: this.username["username"],
      UserCustomerName: this.model.UserCustomerName,
      UserAddress: this.model.UserAddress,
      UserPhoneNo: this.model.UserPhoneNo,
      EmailID: this.model.EmailID,

      UserCityName: this.model.UserCityName,
      UserContactPerson: this.model.UserContactPerson,
      UserComments: this.model.UserComments,
      currencyId: this.model.currencyId,
      PrefferedCurrency: this.preCurrencyId,
      
    };




  }
  rebindValuesaftupd(user): void {
    this.model.Username = this.username["username"];
    this.model.UserCustomerName = user.UserCustomerName;
    this.model.UserAddress = user.UserAddress;
    this.model.UserPhoneNo = user.UserPhoneNo;
    this.model.EmailID = user.EmailID;

    // this.selectedCurrency = this.currencies.filter(currrency => currrency.currencyId === user[0].prefferedCurrency);
    this.model.UserCityName = user.UserCityName;
    this.model.UserContactPerson = user.UserContactPerson;
    this.model.UserComments = user.UserComments;

    this.inituser = {
      Username: this.username["username"],
      UserCustomerName: this.model.UserCustomerName,
      UserAddress: this.model.UserAddress,
      UserPhoneNo: this.model.UserPhoneNo,
      EmailID: this.model.EmailID,

      UserCityName: this.model.UserCityName,
      UserContactPerson: this.model.UserContactPerson,
      UserComments: this.model.UserComments,
      currencyId: this.model.currencyId,
      PrefferedCurrency: this.updCurrencyId
    };
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("changed");
  }
  changeEmail() {
    console.log('email changed');
  }
  close() {
    this.router.navigate(['buycontainer']);
  }

}
