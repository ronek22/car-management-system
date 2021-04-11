import { Component, Inject, OnInit } from '@angular/core';
import { Car, Customer } from '../../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss'],
})
export class CustomerDialogComponent implements OnInit {
  customer: Customer;
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    public dialogRef: MatDialogRef<CustomerDialogComponent>
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });

    if (this.customer) {
      this.fillForm();
    }
  }

  fillForm(): void {
    this.customerForm.setValue({
      firstName: this.customer.first_name,
      lastName: this.customer.last_name,
      phone: this.customer.phone,
      email: this.customer.email,
    });
  }

  getData(): void {
    this.data = {
      first_name: this.customerForm.value['firstName'],
      last_name: this.customerForm.value['lastName'],
      phone: this.customerForm.value['phone'],
      email: this.customerForm.value['email'],
    } as Customer;

    if (this.customer) {
      this.data = {
        ...this.data,
        id: this.customer.id,
      };
    }

    this.dialogRef.close(this.data);
  }
}
