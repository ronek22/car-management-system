import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer, Offer } from '../../../models/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  offerForm: FormGroup;
  availableCustomers$: Observable<Customer[]>;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public offer: Offer,
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.availableCustomers$ = this.customerService.getCustomersList();

    this.offerForm = this.fb.group({
      id: [this.offer.id],
      customer: [this.offer.customer],
    });
  }

  compareCustomer(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  getData(): void {
    const result = {
      id: this.offer.id,
      customer: this.offerForm.value['customer'],
    };

    console.log(result);

    this.dialogRef.close(result);
  }
}
