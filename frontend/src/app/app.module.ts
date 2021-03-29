import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './navbar/navbar.component';
import {OfferComponent} from './offer/offer.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {VehicleComponent} from './vehicle/vehicle.component';
import {CustomerComponent} from './customer/customer.component';
import {EmployeeComponent} from './employee/employee.component';
import {BrokerComponent} from './broker/broker.component';
import {OfferDialogComponent} from './offer/dialogs/offer-dialog.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { VehicleDialogComponent } from './vehicle/vehicle-dialog/vehicle-dialog.component';
import { CustomerDialogComponent } from './customer/customer-dialog/customer-dialog.component';
import { EmployeeDialogComponent } from './employee/employee-dialog/employee-dialog.component';
import { BrokerDialogComponent } from './broker/broker-dialog/broker-dialog.component';
import { EditOfferComponent } from './offer/offer-detail/edit-offer/edit-offer.component';
import { EditCustomerComponent } from './offer/offer-detail/edit-customer/edit-customer.component';
import { EditEmployeeComponent } from './offer/offer-detail/edit-employee/edit-employee.component';
import { EditBrokerComponent } from './offer/offer-detail/edit-broker/edit-broker.component';
import { EditVehicleComponent } from './offer/offer-detail/edit-vehicle/edit-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OfferComponent,
    VehicleComponent,
    CustomerComponent,
    EmployeeComponent,
    BrokerComponent,
    OfferDialogComponent,
    OfferDetailComponent,
    ConfirmationDialogComponent,
    VehicleDialogComponent,
    CustomerDialogComponent,
    EmployeeDialogComponent,
    BrokerDialogComponent,
    EditOfferComponent,
    EditCustomerComponent,
    EditEmployeeComponent,
    EditBrokerComponent,
    EditVehicleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'csrftoken', headerName: 'X-CSRFToken'}),
    AppRoutingModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    NgxDatatableModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,

  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
