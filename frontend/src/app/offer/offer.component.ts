import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Offer} from '../models/models';
import {OfferService} from '../services/offer.service';
import {ColumnMode, DatatableComponent, SelectionType} from '@swimlane/ngx-datatable';
import {OfferDialogComponent} from './dialogs/offer-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {map, switchMap} from 'rxjs/operators';
import {empty} from "rxjs";
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, AfterViewInit {

  isLoading = true;

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  offers: Offer[];
  columns: any[] = [
    // {name: 'ID', prop: 'id', sortable: false},
    {prop: 'vehicle', name: 'Pojazd'},
    // {prop: 'car.model', name: 'Model'},
    {prop: 'car.year', name: 'Rocznik'},
    {prop: 'vin', name: 'VIN', sortable: false},
    {prop: 'pay_for_transport', name: 'Pay For Transport'},
    {prop: 'ship_documents_to_agency', name: 'Ship documents to agency'},
    {prop: 'over_fracht', name: 'Over fracht'},
    {prop: 'over_odprawa', name: 'Over odprawa'},
    {prop: 'over_transport_to_pl', name: 'Over transport to PL'},
    {prop: 'over_hst', name: 'Over HST'},
  ];

  selected = [];
  SelectionType = SelectionType;

  constructor(private offerService: OfferService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.offerService.getOfferList().subscribe(response => {
      this.offers = response.map(offer => ({
        ...offer,
        vehicle: `${offer.car.make.name} ${offer.car.model}`
      }));
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.ngxDatatable.columnMode = ColumnMode.force;
  }

  singleSelectCheck = (row: any) => {
    return this.selected.indexOf(row) === -1;
  }

  onSelect({selected}): void {
    console.log('Select event', this.selected);
  }

  onActivate(event): void {
    console.log('Activate event', event);
  }

  addOffer(): void {
    const dialogRef = this.dialog.open(OfferDialogComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (!result) {
        return empty();
      }
      return this.offerService.addOffer(result);
    })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.offerService.getOfferList();
      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.offers = response.map(offer => ({
        ...offer,
        vehicle: `${offer.car.make.name} ${offer.car.model}`
      }));
    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });

    dialogRef.componentInstance.confirmTitle = 'Usuwanie oferty';
    dialogRef.componentInstance.confirmMessage = 'Jesteś pewny? Zmiany nie mogą zostać cofnięte.';
    dialogRef.componentInstance.confirmAction = 'USUŃ';

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (!result) {
          return empty();
        }

        return this.offerService.deleteOffer(this.selected[0].id);
      })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.offerService.getOfferList();

      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.offers = response.map(offer => ({
        ...offer,
        vehicle: `${offer.car.make.name} ${offer.car.model}`
      }));

      this.selected = [];

    });
  }


}
