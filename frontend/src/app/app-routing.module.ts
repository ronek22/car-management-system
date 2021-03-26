import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OfferComponent} from './offer/offer.component';
import {VehicleComponent} from './vehicle/vehicle.component';
import {CustomerComponent} from './customer/customer.component';
import {EmployeeComponent} from './employee/employee.component';
import {BrokerComponent} from './broker/broker.component';

const routes: Routes = [
  {path: 'offers', component: OfferComponent},
  {path: 'vehicles', component: VehicleComponent},
  {path: 'clients', component: CustomerComponent},
  {path: 'employees', component: EmployeeComponent},
  {path: 'brokers', component: BrokerComponent},

  {path: '*', component: OfferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
