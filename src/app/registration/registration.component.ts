import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AlertService, UserService, ITradePortalService } from '../_services/index';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { forEach } from '@angular/router/src/utils/collection';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { concat } from 'rxjs/observable/concat';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    model: any = {
        selectedCountry: []
    };
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
    model2: any = {};
    disableUserDetail = false;
    cPassword: string;
    mode = 'new';
    currency: any = [];
    country: any = [];
    usermodel: any = [];
    @ViewChild(ReCaptchaComponent) capcha: ReCaptchaComponent;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private iTradePortalService: ITradePortalService,
        private toastr: ToastrService
    ) { }

    register() {
        this.model2 = this.selectedCurrency;
        if (this.selectedCurrency.length > 0) {
            this.model.currencyId = this.model2[0].currencyId;
        }
        const userData = this.model;
        if (this.capchaValue) {
            for (let i in this.selectedCountry) {
                this.cntry_id.push(this.selectedCountry[i].countryId);
            }

            this.currency = this.selectedCurrency;
            this.country = this.selectedCountry;
            userData.UserCountryID = this.cntry_id;
            this.iTradePortalService.userRegistration(userData)
                .subscribe(
                    data => {
                        if (data['status'] === 'true') {
                            this.mode = 'edit';
                            this.toastr.success('You have registered successfully, Once approved by admin you will be able to login', 'Registration');
                            this.dropdownSettings = true;
                            this.model.selectedCurrency = this.currency;
                            this.model.selectedCountry = this.country;
                            this.disableUserDetail = true;
                            this.countryDropdownSettings = {
                                singleSelection: false,
                                text: 'Select Countries',
                                enableSearchFilter: true,
                                classes: 'myclass custom-class',
                                enableCheckAll: true,
                                maxHeight: 300,
                                badgeShowLimit: 1,
                                disabled: true,
                                displayAllSelectedText: true
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

                            // this.model = formValue;
                        } else {
                            this.toastr.error(data['message'], 'Registration');
                        }
                    },
                    Error => {
                        this.toastr.error('Registration failed please contact multiboxx admin for further details', 'Registration');

                    });
        } else {
            // alert msg
            this.toastr.clear();
            this.toastr.error('', 'Captcha required');
            return;
        }
    }


    ngOnInit(): void {
        this.mode = 'new';
        this.iTradePortalService.getCurrency()
            .subscribe(
                data => {
                    for (let i in data) {
                        this.currencies[i] = data[i];
                        this.currencies[i].id = data[i].currencyId;
                        this.currencies[i].itemName = data[i].currencyCode;
                        this.currencies[i].itemCode = data[i].currencyName;
                    }
                }
            )
            ;
        this.iTradePortalService.getAllCountry()
            .subscribe(
                data => {
                    for (let i in data) {
                        this.countries[i] = data[i];
                        this.countries[i].id = data[i].countryId;
                        this.countries[i].itemName = data[i].countryName;
                        this.countries[i].itemCode = data[i].countryCode;
                    }
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

        this.countryDropdownSettings = {
            singleSelection: false,
            text: 'Select Countries',
            enableSearchFilter: true,
            classes: 'myclass custom-class',
            enableCheckAll: true,
            maxHeight: 300,
            badgeShowLimit: 1

        };
    }

    isUserUnique = (value: any): any => {
        return new Observable((observer) => {
            observer.next({ asyncInvalid: true });
        }).first();
    }

    resetCapcha(): void {

        this.capcha.reset();
        this.capchaValue = "";

    }

    onItemSelect(item: any) {
        //  console.log(item);
        // this.selectedCurrency = item;
        //  console.log(this.selectedCurrency);
    }
    OnItemDeSelect(item: any) {
        // console.log(item);
        // console.log(this.selectedCurrency);
    }
    onSelectAll(items: any) {
        // console.log(items);
    }
    onDeSelectAll(items: any) {
        // console.log(items);
    }

    handleCorrectCaptcha(event): void {
        this.capchaValue = event;
    }

    /* Unique Username Validation*/
    isUserNameUnique = (value: any): any => {
        this.model.Username = value;
        delete this.model.selectedCountry;
        delete this.model.recapcha;
        return new Observable((observer) => {
            this.iTradePortalService.isUserNameUnique(this.model).subscribe((data) => {
                if (data['status'] === 'false') {
                    observer.next({ asyncInvalid: true });
                } else {
                    observer.next(null);
                }
            });
        }).first();
    }
}
