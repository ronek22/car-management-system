import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Broker, Car, Offer} from "../../../models/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BrokerService} from "../../../services/broker.service";
import {CarService} from "../../../services/car.service";

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {

  offerForm: FormGroup;
  availableCars$: Observable<Car[]>;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public offer: Offer,
              public dialogRef: MatDialogRef<EditVehicleComponent>,
              private carService: CarService
  ) {
  }

  ngOnInit(): void {
    this.availableCars$ = this.carService.getCarList();

    this.offerForm = this.fb.group({
      id: [this.offer.id],
      car: [this.offer.car],
      vin: [this.offer.vin, Validators.pattern(
          '^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$')]
    });
  }

  compareCar(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  getData(): void {
      const result = {
        id: this.offer.id,
        car: this.offerForm.value['car'],
        vin: this.offerForm.value['vin']
      };


      this.dialogRef.close(result);

  }

}
