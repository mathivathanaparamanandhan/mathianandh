import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {RegistrationComponent} from './registration/registration.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';
import { PortaluserprofileComponent } from './portaluserprofile/portaluserprofile.component';
import { BuycontainerComponent } from './buycontainer/buycontainer.component';
import { MyordersComponent } from './myorders/myorders.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { CartDetailsComponent} from './cart-details/cart-details.component';
import { AvailabilitydetailsComponent } from './availabilitydetails/availabilitydetails.component';
import { AvailabilityViewdetailComponent } from './availability-viewdetail/availability-viewdetail.component';
import { OverviewComponent } from './overview/overview.component';
import { AdminuserprofileComponent } from './adminuserprofile/adminuserprofile.component';
const appRoutes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'userprofile' , component: UserprofileComponent,canActivate: [AuthGuard]} ,
    { path: 'landingpage' , component: LandingPageComponent },
    { path: 'adminlogin', component: AdminloginComponent },
    { path: 'adminforgotpassword', component: AdminForgotPasswordComponent },
    { path: 'portaluserprofile', component: PortaluserprofileComponent },
    { path: 'buycontainer', component: BuycontainerComponent,canActivate: [AuthGuard] },
    { path: 'availability', component: AvailabilitydetailsComponent },
    { path: 'myorders', component: MyordersComponent,canActivate: [AuthGuard] },
    { path: 'userdetail', component: UserdetailComponent },
    { path: 'cartDetails', component: CartDetailsComponent,canActivate: [AuthGuard] },
    { path: 'availability-viewdetail', component: AvailabilityViewdetailComponent },
    { path: 'overview', component: OverviewComponent },
    { path: 'adminuserprofile', component: AdminuserprofileComponent },
    { path: 'viewdetails/:sL_OFFR_UNT_DTL_BIN', component: ViewDetailsComponent,canActivate: [AuthGuard], data: {
        breadcrumb: "Container Details"
      } },
     { path:'home', component:LandingPageComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: 'landingpage' }
];

export const routing = RouterModule.forRoot(appRoutes);
