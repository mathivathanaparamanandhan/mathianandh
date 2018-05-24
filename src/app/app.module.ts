﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpModule } from "@angular/http";
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { MatButtonModule, MatCheckboxModule, MatSidenavModule } from '@angular/material';
import { DataFilterPipe } from './portaluserprofile/data-filter.pipe';
import { DataTableModule } from "angular2-datatable";
import { ModalModule, PaginationModule, BsDropdownModule } from "ngx-bootstrap";
import {CalendarModule} from 'primeng/calendar';
import { RouterModule } from '@angular/router';
import {  DataTable, Column, InputMask } from 'primeng/primeng';

import {
    AlertService,
    AuthenticationService,
    UserService,
    PortaluserprofileService,
    UserdetailService,
    ITradePortalService
} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IasyncValidator } from './_directives/_customValidator/iasyncValidator';
import { CustomFormsModule } from 'ng2-validation';
import { GlobalValues } from '../app/common/_common';
import { CapslockDirective } from './_directives/capslock.directive';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './registration/registration.component';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ContainerComponent } from './container/container.component';
import { FilterComponent } from './filter/filter.component';
import { ContainerService } from './_services/container.service';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FilterSummaryComponent } from './filter-summary/filter-summary.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { LandingComponent } from './landing/landing.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';
import { PortaluserprofileComponent } from './portaluserprofile/portaluserprofile.component';
import { AdmnChangepasswordComponent } from './admn-changepassword/admn-changepassword.component';
import { CookieService, CookieOptions } from "angular2-cookie/core";
import { BuycontainerComponent } from './buycontainer/buycontainer.component';
import { ContainerPipe } from './buycontainer/container.pipe';
import { ContainerPipeAvl } from './availabilitydetails/container.pipe'
import { SortbyPipe } from './buycontainer/sortby.pipe';
import { SortbyPipeAvl } from './availabilitydetails/sortby.pipe';
import { NgxPaginationModule } from "ngx-pagination";
import { MyordersComponent } from './myorders/myorders.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { OrderModule } from "ngx-order-pipe";
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AvailabilitydetailsComponent } from './availabilitydetails/availabilitydetails.component';
import { AvailabilityViewdetailComponent } from './availability-viewdetail/availability-viewdetail.component';
import { OverviewComponent } from './overview/overview.component';
import { AdminuserprofileComponent } from './adminuserprofile/adminuserprofile.component';



@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        CustomFormsModule,
        HttpClientModule,
        routing,
        HttpModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        BsDropdownModule.forRoot(),
        NgxPaginationModule,
        ReCaptchaModule,
        AngularMultiSelectModule,
        MatSidenavModule,
        DataTableModule,
        BootstrapModalModule.forRoot({ container: document.body }),
        OrderModule,
        TableModule,
        CheckboxModule,
        CalendarModule

    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        ForgotPasswordComponent,
        ChangepasswordComponent,
        CapslockDirective,
        RegistrationComponent,
        HeaderComponent,
        FooterComponent,
        ContainerComponent,
        FilterComponent,
        BreadcrumbComponent,
        FilterSummaryComponent,
        IasyncValidator,
        UserprofileComponent,
        LandingComponent,
        LandingPageComponent,
        AdminloginComponent,
        AdminForgotPasswordComponent,
        DataFilterPipe,
        ContainerPipe,
        SortbyPipe,
        ContainerPipeAvl,
        SortbyPipeAvl,
        PortaluserprofileComponent,
        AdmnChangepasswordComponent,
        BuycontainerComponent,
        MyordersComponent,
        UserdetailComponent,
        ViewDetailsComponent,
        CartDetailsComponent,
        AvailabilitydetailsComponent,
        AvailabilityViewdetailComponent,
        OverviewComponent,
        AdminuserprofileComponent

    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        CookieService,
        { provide: CookieOptions, useValue: false },
        ContainerService,
        PortaluserprofileService,
        UserdetailService,
        ITradePortalService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        GlobalValues,

        // provider used to create fake backend
        fakeBackendProvider,
        GlobalValues
    ],
    entryComponents: [
        ForgotPasswordComponent,
        ChangepasswordComponent,
        AdmnChangepasswordComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
