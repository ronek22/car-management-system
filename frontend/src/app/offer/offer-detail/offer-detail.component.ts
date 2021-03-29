import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../models/models";
import {BrokerDialogComponent} from "../../broker/broker-dialog/broker-dialog.component";
import {empty, Observable} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditOfferComponent} from "./edit-offer/edit-offer.component";
import {EditBrokerComponent} from "./edit-broker/edit-broker.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";
import {EditVehicleComponent} from "./edit-vehicle/edit-vehicle.component";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  offer: Offer;
  offerId: number;

  dialogMap = {
    'offer': EditOfferComponent,
    'broker': EditBrokerComponent,
    'customer': EditCustomerComponent,
    'employee': EditEmployeeComponent,
    'vehicle': EditVehicleComponent
  }

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.fetchOffer().subscribe(response => {
      this.offer = response;
    });
  }

  fetchOffer(): Observable<Offer> {
        return this.route.params.pipe(
      switchMap(params => this.offerService.getOfferDetail(+params['id']))
    );
  }

  editOffer(component): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.offer;
    dialogConfig.disableClose = true;

    const dialogComponent = this.dialogMap[component];
    const dialogRef = this.dialog.open(dialogComponent, dialogConfig);

    // dialogRef.componentInstance.offer = this.offer;

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (!result) {
        return empty();
      }
      return this.offerService.editOffer(result);
    })).pipe(switchMap(() => {
      return this.fetchOffer()
    })).subscribe(response => {
      this.offer = response;
    })
  }
}
