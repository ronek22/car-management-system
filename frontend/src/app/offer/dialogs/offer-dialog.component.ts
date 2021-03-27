import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Broker, Car, Customer, Employee, Offer} from "../../models/models";

@Component({
  selector: 'app-offer-dialog',
  templateUrl: './offer-dialog.component.html',
  styleUrls: ['./offer-dialog.component.scss']
})
export class OfferDialogComponent implements OnInit {
  carForm: FormGroup;
  customerForm: FormGroup;
  brokerForm: FormGroup;
  employeeForm: FormGroup;
  offerForm: FormGroup;

  rowGap = '20px';

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Offer,
              public dialogRef: MatDialogRef<OfferDialogComponent>
              ) {
  }

  ngOnInit(): void {
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      vin: ['', Validators.required]
    });

    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });

    this.brokerForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.employeeForm = this.fb.group({
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
      pay_for_transport: this.offerForm.value['payForTransport'],
      ship_documents_to_agency: this.offerForm.value['shipDocumentsToAgency'],
      additional_data: this.offerForm.value['additionalData'],
      over_fracht: this.offerForm.value['overFracht'],
      over_odprawa: this.offerForm.value['overOdprawa'],
      over_transport_to_pl: this.offerForm.value['overTransportToPl'],
      over_hst: this.offerForm.value['overHST']
    } as Offer;

    this.dialogRef.close(this.data);

    // console.log(this.data);
  }

}
