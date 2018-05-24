import { Component, OnInit } from '@angular/core';
import { UserdetailService } from '../_services/index';
import { Http } from "@angular/http";
// import { FilterPipe } from './filter.pipe';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AlertService, UserService, ITradePortalService } from '../_services/index';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { forEach } from '@angular/router/src/utils/collection';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { concat } from 'rxjs/observable/concat';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { PortalUser } from '../_models/portaluser';

import { GlobalValues } from "../common/_common";

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
  private data;
  public datas;
  userStatusID:number;
  selectedCountries:Array<any> = [];
  selectedCars1:Array<any> = [];
  UserCountryID:Array<any>=[];
  cars:any = [];
  model: any = {
    selectedCountry: [],
    selectedCustomer: [],
    selectedCity: [],
    selectedBank: [],
    selectedOrganization: [],
    selectedCurrency: [],
    selectStatus:[],
  };
  submitmodel:any={};
  priceAdjustmntVal:string;
  userRemarks:string;
  buyer:boolean=false;
  lessee:boolean=false;
  loading = false;
  currencies: any = [];
  countries: any = [];
  dropdownList = [];
  selectedCurrency = [];
  selectedCountry = [];
  dropdownSettings = {};
  countryDropdownSettings = {};
  capchaValue: string;
  cntry_id: any = [];
  currencyId: string;
  username:string;
  model2: any = {};
  disableUserDetail = false;
  cPassword: string;
  mode = 'new';
  currency: any = [];
  country: any = [];
  usermodel: any = [];
  CustomerDropdownSettings = {};
  CityDropdownSettings = {};
  BankDropdownSettings = {};
  CurrencyDropdownSettings = {};
  OrganizationDropdownSettings = {};
  dropdownStatus={};
  selectedCity = [];
  selectStatus =[];
  selectedBank = [];
  selectedOrganisation = [];
  selectedCustomer = [];
  checkedList = [];
  datas1: any = [];
  customers: any = [];
  cities: any = [];
  orgs: any = [];
  banks:any=[];
  currencyLKP: any = [];
  customerLKP: any = [];
  cityLKP: any = [];
  statusLKP:any=[];
  organisationBNKLKP: any = [];
  organisationLKP: any = [];
  allCntrys: any = [];
  cols: any[];
  status:any=[];
  EmailID:string;
  portaluser:any;
    portalUser: PortalUser;
    prtluserid:any;
    rntlbit:boolean=true;
    valdbit:boolean=true;
    stsReq:boolean=false;
  constructor(private http: Http, public userdetail: UserdetailService,
    public itradeportalservice: ITradePortalService, private toastr: ToastrService) {
    }

  ngOnInit() {
    this.portaluser=localStorage.getItem('userdetail');
    let user :any =JSON.parse(this.portaluser);
    this.prtluserid=user["userID"];
       this.buyer=false;
    this.lessee=false;
    this.country=[];
    this.userdetail.type1S;
    this.userStatusID=user["userStatusID"];
    this.itradeportalservice.getUserDetailsByID(user["userID"])
      .subscribe(
        data => {
          this.datas = data;
          this.EmailID=this.datas[0].emailID;
          this.userStatusID=this.datas[0].userStatusID;
          if (this.datas[0]['portalUserCountryView'].length>0){

          
          for (let j in this.datas[0]['portalUserCountryView']) {
            this.country.push(this.datas[0]['portalUserCountryView'][j].cntrY_NAM);
            this.country.push("\n");
          }
         
        }
        this.priceAdjustmntVal=this.datas[0].priceAdjustmntVal;
        this.userRemarks=this.datas[0].userRemarks;
        this.buyer=this.datas[0].buyer;
        this.lessee=this.datas[0].lessee;
        this.EmailID=this.datas[0].emailID;
        }

      );
    this.itradeportalservice.getAllLookupValues(user["userID"])
      .subscribe(
        data => {
          this.currencyLKP = data['currency'];
          this.customerLKP = data['customeR_VENDOR_LKP'];
          this.cityLKP = data['citY_LKP']
          this.organisationBNKLKP = data['organisatioN_BANK_LKP'];
                  this.organisationLKP = data['organisatioN_LKP'];
          for (let i in this.currencyLKP) {
            this.currencies[i] = this.currencyLKP[i];
            this.currencies[i].id = this.currencyLKP[i].currencyId;
            this.currencies[i].itemName = this.currencyLKP[i].currencyCode;
            this.currencies[i].itemCode = this.currencyLKP[i].currencyName;
          }
          this.model.selectedCurrency = this.currencies.filter(currrency => currrency.currencyId === this.datas[0].prefferedCurrency);
          for (let i in this.customerLKP) {
            this.customers[i] = this.customerLKP[i];
            this.customers[i].id = this.customerLKP[i].cstmR_ID;
            this.customers[i].itemName = this.customerLKP[i].organisatioN_NAME;
            this.customers[i].itemCode = this.customerLKP[i].cstmR_CD;
          }
          this.model.selectedCustomer=this.customers.filter(customers => customers.cstmR_ID === this.datas[0].mappingCustomerID)
          if (this.datas[0].mappingCustomerID >0){
            if(this.model.selectedCustomer[0].rntL_BT == true){
              this.rntlbit =false;
            }else {
              this.rntlbit =true;
            }
          }
          for (let i in this.cityLKP) {
            this.cities[i] = this.cityLKP[i];
            this.cities[i].id = this.cityLKP[i].ctY_ID;
            this.cities[i].itemName = this.cityLKP[i].ctY_NAM;
            this.cities[i].itemCode = this.cityLKP[i].ctY_CD;
          }
          this.model.selectedCity=this.cities.filter(cities => cities.ctY_ID === this.datas[0].mappingCityID)
          for (let i in this.organisationLKP) {
            this.orgs[i] = this.organisationLKP[i];
            this.orgs[i].id = this.organisationLKP[i].trdnG_PRTNR_BIN;
            this.orgs[i].itemName = this.organisationLKP[i].trdnG_PRTNR_TCD;
            this.orgs[i].itemCode = this.organisationLKP[i].trdnG_PRTNR_NAM;
          }
          this.model.selectedOrganization=this.orgs.filter(orgs => orgs.trdnG_PRTNR_BIN === this.datas[0].mappingOrganisationID)
          for (let i in this.organisationBNKLKP) {
            this.banks[i] = this.organisationBNKLKP[i];
            this.banks[i].id = this.organisationBNKLKP[i].trdnG_PRTNR_BNK_BIN;
            this.banks[i].itemName = this.organisationBNKLKP[i].bnK_NAM;
            this.banks[i].itemCode = this.organisationBNKLKP[i].bnK_CD;
          }
          GlobalValues.banks=this.banks;
          this.model.selectedBank=this.banks.filter(bank => bank.trdnG_PRTNR_BNK_BIN === this.datas[0].mappingBankID)

        });
    this.itradeportalservice.getPortalUserCNTRY(user["userID"])
      .subscribe(
        data => {
          this.cars = data;
          for(let i in data){
            if(data[i]['slct']){
              this.selectedCars1.push(data[i]);
            }
          }
          
          this.cols = [
            { field: 'cntrY_CD', header: 'Country Code',hidden: false },
            { field: 'cntrY_NAM', header: 'Country Name',hidden: false },
          ];
        }

      );

      this.itradeportalservice.getStatusLKP(this.userStatusID)
        .subscribe(
          data => {
            this.statusLKP=data;
            for (let i in this.statusLKP) {
              this.status[i] = this.statusLKP[i];
              this.status[i].id = this.statusLKP[i].enM_ID;
              this.status[i].itemName = this.statusLKP[i].enM_DSCRPTN_VC;
              this.status[i].itemCode = this.statusLKP[i].enM_CD;
            }
           
            this.model.selectStatus=this.status.filter(status1 => status1.enM_ID === this.userStatusID)
      
          }
        );
      


    this.mode = 'new';
    this.countryDropdownSettings = {
      singleSelection: true,
      text: 'Select country',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll: false,
      maxHeight: 300,
      showCheckbox: false

    };

    this.CustomerDropdownSettings = {
      singleSelection: true,
      text: 'Select customer',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll: false,
      maxHeight: 300,
      showCheckbox: false

    };
    this.CityDropdownSettings = {
      singleSelection: true,
      text: 'Select city',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll: false,
      maxHeight: 300,
      showCheckbox: false

    };
    this.BankDropdownSettings = {
      singleSelection: true,
      text: 'Select bank',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll: false,
      maxHeight: 300,
      showCheckbox: false

    };
    this.OrganizationDropdownSettings = {
      singleSelection: true,
      text: 'Select Organization',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll: false,
      maxHeight: 300,
      showCheckbox: false

    };
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Select Currency',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll: false,
      maxHeight: 300,
      showCheckbox: false
    };
    this.dropdownStatus = {
      singleSelection: true,
      text: 'Select Status',
      enableSearchFilter: false,
      classes: 'myclass custom-class',
      enableCheckAll: false,
      maxHeight: 300,
      showCheckbox: false
    };

    let name: any = localStorage.getItem('currentAdminUser');
    name = JSON.parse(name);
    this.username = name.username;
  }
  submitPortalUser() {

  }
  onSubmit(f: NgForm) {
    this.submitmodel.UserStatusID=this.model["selectStatus"][0].enM_ID;
   if (this.submitmodel.UserStatusID==8 && f.value.Remarks==null){
    this.toastr.error('Please Give Reason For Reject')
  } else {
    
 
   
 this.model.buyer=this.buyer;
    this.model.lessee=this.lessee;
    this.UserCountryID=[];
    for(let i in this.selectedCars1){
      this.UserCountryID.push(this.selectedCars1[i].prtL_USR_CNTRY_ID)
    
    }


if (this.submitmodel.UserStatusID==8){

}else{
  this.submitmodel.MappingBankID=this.model.selectedBank[0].trdnG_PRTNR_BNK_BIN;
  this.submitmodel.MappingCityID=this.model.selectedCity[0].ctY_ID
  if (this.model.selectedCurrency.length > 0) {
    this.submitmodel.PrefferedCurrency=this.model.selectedCurrency[0].currencyId;
  }
  this.submitmodel.MappingCustomerID=this.model.selectedCustomer[0].cstmR_ID
  this.submitmodel.MappingOrganisationID=this.model.selectedOrganization[0].trdnG_PRTNR_BIN
}


this.submitmodel.UserCountryID=this.UserCountryID;

this.submitmodel.Buyer=this.buyer;
this.submitmodel.Lessee=this.lessee;
if(this.priceAdjustmntVal) {
  this.submitmodel.PriceAdjustmntVal=this.priceAdjustmntVal;
} else {
  this.submitmodel.PriceAdjustmntVal=0;
}



this.submitmodel.UserRemarks=f.value.Remarks;
this.submitmodel.ModifiedBy=this.username;
this.submitmodel.UserStatusUpdatedBy=this.username;
this.submitmodel.UserID= this.prtluserid;
this.submitmodel.EmailID=this.EmailID;

if(this.submitmodel.PriceAdjustmntVal == 0 || this.submitmodel.PriceAdjustmntVal >0 || this.submitmodel.PriceAdjustmntVal <0) {
  if( (this.submitmodel.UserStatusID==8) || (this.buyer===true || this.lessee===true) ){
    this.itradeportalservice.updatePortalUserDetails(this.submitmodel)
    .subscribe( data => {
       if (data['status'] === 'true') {
         this.toastr.clear();
         this.toastr.success(data['message'], '',{ closeButton: true});
         } else {
         this.toastr.clear();
         this.toastr.error(data['message'], '');
       }
     },
     Error => {
       this.toastr.clear();
       this.toastr.error('There is an Error in Updating User Details Please contact Administrator', '');
     });
   }else{
     this.toastr.clear();
     this.toastr.error('Please select user is Buyer or Lessee')
   }
} else {
  this.toastr.clear();
     this.toastr.error('Price Adjustment Value Accepts Numeric Only')
}
  

}
   
   }
     
   
  mon(item, items, event) {
    if (event.target.checked) {
      this.checkedList.push(item, items);
    } else {
      for (var i = 0; i < this.data.length; i++) {
        if (this.checkedList[i] == item && this.checkedList[i + 1] == items) {
          this.checkedList.splice(i, 2);
        }
      }
    }
  }
 
  selectCarWithButton(car: ITradePortalService) {
    // this.selectedCar2 = car;
    //  this.msgs = [{severity:'info', summary:'Car Selected', detail:'Vin: ' + car.vin}];
  }

  onRowSelect(event) {
    // this.msgs = [{severity:'info', summary:'Car Selected', detail:'Vin: ' + event.data.vin}];
  }

  onRowUnselect(event) {    
    //  this.msgs = [{severity:'info', summary:'Car Unselected', detail:'Vin: ' + event.data.vin}];
  }
  onOrgSelect(userDetails:any){
    this.banks=[];
    this.model.selectedBank=[];
    for(let i in GlobalValues.banks){
      if(GlobalValues.banks[i].trdnG_PRTNR_BIN===userDetails[0].trdnG_PRTNR_BIN){
        this.banks.push(GlobalValues.banks[i])
      }
    }
  }
  onCstmrSelect(cstmrDetails:any){
    if(cstmrDetails[0].rntL_BT == true){
    this.rntlbit =false;
  }else {
    this.rntlbit =true;
    this.lessee=false
  }

  }
  onStatusSelect(statusDetails:any){
    if(statusDetails[0].id ==8){
      this.valdbit =false;
      this.stsReq=true;
      this.CityDropdownSettings = {
        singleSelection: true,
        text: 'Select city',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: true
  
      };
      this.CustomerDropdownSettings = {
        singleSelection: true,
        text: 'Select customer',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: true
  
      };
      this.BankDropdownSettings = {
        singleSelection: true,
        text: 'Select bank',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: true
  
      };
      this.OrganizationDropdownSettings = {
        singleSelection: true,
        text: 'Select Organization',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: true
  
      };
      this.dropdownSettings = {
        singleSelection: true,
        text: 'Select Currency',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: true
      };
  
    } else{
      this.valdbit =true;
      this.stsReq=false;
      this.CityDropdownSettings = {
        singleSelection: true,
        text: 'Select city',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: false
       
  
      };
      this.CustomerDropdownSettings = {
        singleSelection: true,
        text: 'Select customer',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: false
  
      };
      this.BankDropdownSettings = {
        singleSelection: true,
        text: 'Select bank',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: false
  
      };
      this.OrganizationDropdownSettings = {
        singleSelection: true,
        text: 'Select Organization',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: false
  
      };
      this.dropdownSettings = {
        singleSelection: true,
        text: 'Select Currency',
        enableSearchFilter: true,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: false
      };
      this.dropdownStatus = {
        singleSelection: true,
        text: 'Select Status',
        enableSearchFilter: false,
        classes: 'myclass custom-class',
        enableCheckAll: false,
        maxHeight: 300,
        showCheckbox: false,
        disabled: false
      };

    }
  }

  onCancel(){
    // localStorage.removeItem('userdetail');
  }

}
