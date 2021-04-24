import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Broker, Customer, Offer } from '../../../models/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../services/customer.service';
import { BrokerService } from '../../../services/broker.service';

@Component({
  selector: 'app-edit-broker',
  templateUrl: './edit-broker.component.html',
  styleUrls: ['./edit-broker.component.scss'],
})
export class EditBrokerComponent implements OnInit {
  offerForm: FormGroup;
  availableBrokers$: Observable<Broker[]>;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public offer: Offer,
    public dialogRef: MatDialogRef<EditBrokerComponent>,
    private brokerService: BrokerService
  ) {}

  ngOnInit(): void {
    this.availableBrokers$ = this.brokerService.getBrokersList();

    this.offerForm = this.fb.group({
      id: [this.offer.id],
      broker: [this.offer.broker],
    });
  }

  compareBroker(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  getData(): void {
    const result = {
      id: this.offer.id,
      broker: this.offerForm.value['broker'],
    };

    this.dialogRef.close(result);
  }
}
