import {Component, Inject, OnInit} from '@angular/core';
import {Broker} from "../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-broker-dialog',
  templateUrl: './broker-dialog.component.html',
  styleUrls: ['./broker-dialog.component.scss']
})
export class BrokerDialogComponent implements OnInit {

  broker: Broker;
  brokerForm: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Broker,
              public dialogRef: MatDialogRef<BrokerDialogComponent>) {
  }

  ngOnInit(): void {
    this.brokerForm = this.fb.group({
      name: ['', Validators.required],
    });

    if (this.broker) {
      this.fillForm();
    }
  }

  fillForm(): void {
    this.brokerForm.setValue({
      name: this.broker.name,
    });
  }

  getData(): void {
    this.data = {
      name: this.brokerForm.value['name'],
    } as Broker;

    if (this.broker) {
      this.data = {
        ...this.data,
        id: this.broker.id
      };
    }
    this.dialogRef.close(this.data);
  }

}
