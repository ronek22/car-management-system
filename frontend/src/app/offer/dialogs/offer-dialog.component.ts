/* tslint:disable:no-string-literal */
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Broker, Car, Customer, Employee, Offer} from "../../models/models";
import {formatDate} from "@angular/common";
import {CarService} from "../../services/car.service";
import {CustomerService} from "../../services/customer.service";
import {Observable} from "rxjs";
import {EmployeeService} from "../../services/employee.service";
import {BrokerService} from "../../services/broker.service";

@Component({
  selector: 'app-offer-dialog',
  templateUrl: './offer-dialog.component.html',
  styleUrls: ['./offer-dialog.component.scss']
})
export class OfferDialogComponent implements OnInit {
  availableCars$: Observable<Car[]>;
  availableCustomers$: Observable<Customer[]>;
  availableEmployees$: Observable<Employee[]>;
  availableBrokers$: Observable<Broker[]>;

  carForm: FormGroup;
  customerForm: FormGroup;
  brokerForm: FormGroup;
  employeeForm: FormGroup;
  offerForm: FormGroup;

  rowGap = '20px';

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Offer,
              public dialogRef: MatDialogRef<OfferDialogComponent>,
              private carService: CarService,
              private customerService: CustomerService,
              private employeeService: EmployeeService,
              private brokerService: BrokerService
  ) {
  }

  ngOnInit(): void {
    this.availableCars$ = this.carService.getCarList();
    this.availableCustomers$ = this.customerService.getCustomersList();
    this.availableEmployees$ = this.employeeService.getEmployeesList();
    this.availableBrokers$ = this.brokerService.getBrokersList();

    this.carForm = this.fb.group({
      mode: ['new'],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      vin: ['', Validators.required]
    });

    this.customerForm = this.fb.group({
      mode: ['new'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });

    this.brokerForm = this.fb.group({
      mode: ['new'],
      name: ['', Validators.required],
    });

    this.employeeForm = this.fb.group({
      mode: ['new'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.offerForm = this.fb.group({
      payForTransport: [''],
      shipDocumentsToAgency: [''],
      additionalData: [''],
      overFracht: [''],
      overOdprawa: [''],
      overTransportToPl: [''],
      overHST: ['']
    });
  }

  carSelected(e: Car): void {
    this.carForm.controls['make'].setValue(e.make.name);
    this.carForm.controls['model'].setValue(e.model);
  }

  customerSelected(e: Customer): void {
    this.customerForm.controls['firstName'].setValue(e.first_name);
    this.customerForm.controls['lastName'].setValue(e.last_name);
    this.customerForm.controls['phone'].setValue(e.phone);
    this.customerForm.controls['email'].setValue(e.email);
  }

  employeeSelected(e: Employee): void {
    this.employeeForm.controls['firstName'].setValue(e.first_name);
    this.employeeForm.controls['lastName'].setValue(e.last_name);
  }

  brokerSelected(e: Broker): void {
    this.brokerForm.controls['name'].setValue(e.name);
  }

  getData(): void {
    this.data = {
      car: {
        make: {
          name: this.carForm.value['make']
        },
        model: this.carForm.value['model'],
        year: this.carForm.value['year']
      } as Car,
      customer: {
        first_name: this.customerForm.value['firstName'],
        last_name: this.customerForm.value['lastName'],
        phone: this.customerForm.value['phone'],
        email: this.customerForm.value['email']
      } as Customer,
      broker: {
        name: this.brokerForm.value['name']
      } as Broker,
      employee: {
        first_name: this.employeeForm.value['firstName'],
        last_name: this.employeeForm.value['lastName']
      } as Employee,
      vin: this.carForm.value['vin'],
      pay_for_transport: this.offerForm.value['payForTransport'] ? formatDate(this.offerForm.value['payForTransport'], 'yyyy-MM-dd', 'en_US') : null,
      ship_documents_to_agency: this.offerForm.value['shipDocumentsToAgency'] ? formatDate(this.offerForm.value['shipDocumentsToAgency'], 'yyyy-MM-dd', 'en_US') : null,
      additional_data: this.offerForm.value['additionalData'],
      over_fracht: this.offerForm.value['overFracht'],
      over_odprawa: this.offerForm.value['overOdprawa'],
      over_transport_to_pl: this.offerForm.value['overTransportToPl'],
      over_hst: this.offerForm.value['overHST']
    };

    this.dialogRef.close(this.data);

    // console.log(this.data);
  }

}
