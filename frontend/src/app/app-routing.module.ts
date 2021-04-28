import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { BrokerComponent } from './broker/broker.component';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./helpers/auth.guard";

const routes: Routes = [
  { path: 'offers', component: OfferComponent, canActivate: [AuthGuard]},
  { path: 'offer/:id', component: OfferDetailComponent, canActivate: [AuthGuard]},
  { path: 'vehicles', component: VehicleComponent, canActivate: [AuthGuard]},
  { path: 'clients', component: CustomerComponent, canActivate: [AuthGuard]},
  { path: 'employees', component: EmployeeComponent, canActivate: [AuthGuard]},
  { path: 'brokers', component: BrokerComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
