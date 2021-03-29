/* tslint:disable */
import {Component, Inject, OnInit} from '@angular/core';
import {Car, Offer} from "../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent implements OnInit {

  vehicle: Car;
  carForm: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Car,
              public dialogRef: MatDialogRef<VehicleDialogComponent>) { }

  ngOnInit(): void {
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
    });

    if (this.vehicle) {
      this.fillForm();
    }
  }

  fillForm(): void {
    this.carForm.setValue({
      make: this.vehicle.make.name,
      model: this.vehicle.model,
      year: this.vehicle.year
    })
  }

  getData(): void {
    this.data = {
      make: {
        name: this.carForm.value['make']
      },
      model: this.carForm.value['model'],
      year: this.carForm.value['year']
    } as Car;

    if (this.vehicle) {
      this.data = {
        ...this.data,
        id: this.vehicle.id
      }
    }


    this.dialogRef.close(this.data);
  }



}
