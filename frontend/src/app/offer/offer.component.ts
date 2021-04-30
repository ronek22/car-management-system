import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Offer, Pagination, PaginationOffer} from '../models/models';
import {OfferService} from '../services/offer.service';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import {OfferDialogComponent} from './dialogs/offer-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {map, switchMap} from 'rxjs/operators';
import {empty} from 'rxjs';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {EditOfferComponent} from "./offer-detail/edit-offer/edit-offer.component";

@Component({
  selector: 'app-offers',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  isLoading = true;

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  offers: Offer;
  pagination: Pagination;
  columns: any[] = [
    // {name: 'ID', prop: 'id', sortable: false},
    {prop: 'car.year', name: 'Rocznik', width: 100, sortable: true},
    {prop: 'car.make.name', name: 'Marka', width: 100, sortable: true},
    {prop: 'car.model', name: 'Model', width: 150, sortable: true},
    {prop: 'vin', name: 'VIN', width: 200, sortable: true},
    {prop: 'client', name: 'Klient', width: 200, sortable: true},
    {prop: 'customer.email', name: 'Email', width: 250, sortable: true},
    {prop: 'pay_for_transport', name: 'Zapłata za transport', width: 150, sortable: false},
    {prop: 'ship_documents_to_agency', name: 'Wysyłka dokumentów', width: 150, sortable: false},
    {prop: 'broker.name', name: 'Broker', width: 150, sortable: false},
    {prop: 'over_fracht', name: 'Over fracht', width: 150, sortable: false},
    {prop: 'over_odprawa', name: 'Over odprawa', width: 150, sortable: false},
    {prop: 'over_transport_to_pl', name: 'Over transport to PL', width: 150, sortable: false},
    {prop: 'employeeFullname', name: 'Kupił', width: 200, sortable: false},
    {prop: 'additional_data', name: 'Informacje dodatkowe', width: 200, sortable: false},

  ];

  selected = [];
  SelectionType = SelectionType;

  constructor(private offerService: OfferService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.offerService.getOfferList().subscribe((response) => {
      this.subscribeOffers(response);
      this.isLoading = false;
    });
  }

  subscribeOffers(response): void {
    this.pagination = response['pagination'];
    this.pagination.page = this.pagination.page - 1;
    this.offers = response['results'].map((offer) => ({
      ...offer,
      vehicle: `${offer.car.make.name} ${offer.car.model}`,
      client: `${offer.customer.first_name} ${offer.customer.last_name}`,
      employeeFullname: `${offer.employee.first_name} ${offer.employee.last_name}`,
    }));
  }


  singleSelectCheck = (row: any) => {
    return this.selected.indexOf(row) === -1;
  };

  setPage(pageInfo): void {
    console.log(pageInfo.offset);
    const query = {
      params: {
        page: pageInfo.offset + 1,
      },
    };
    this.offerService.getOfferList(query).subscribe((response) => {
      this.subscribeOffers(response);
      this.isLoading = false;
    });
  }

  addOffer(): void {
    const dialogRef = this.dialog.open(OfferDialogComponent, {
      data: {},
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) {
            return empty();
          }
          return this.offerService.addOffer(result);
        })
      )
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this.offerService.getOfferList();
        }),
        map((data) => {
          this.isLoading = false;
          return data;
        })
      )
      .subscribe((response) => {
        this.subscribeOffers(response);
      });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
    });

    dialogRef.componentInstance.confirmTitle = 'Usuwanie oferty';
    dialogRef.componentInstance.confirmMessage =
      'Jesteś pewny? Zmiany nie mogą zostać cofnięte.';
    dialogRef.componentInstance.confirmAction = 'USUŃ';

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) {
            return empty();
          }

          return this.offerService.deleteOffer(this.selected[0].id);
        })
      )
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this.offerService.getOfferList();
        }),
        map((data) => {
          this.isLoading = false;
          return data;
        })
      )
      .subscribe((response) => {
        this.subscribeOffers(response);

        this.selected = [];
      });
  }

  editOffer(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.selected[0];
    dialogConfig.disableClose = true;

    const dialogComponent = EditOfferComponent;
    const dialogRef = this.dialog.open(dialogComponent, dialogConfig);


    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) {
            return empty();
          }
          return this.offerService.editOffer(result);
        })
      )
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this.offerService.getOfferList();
        }),
        map((data) => {
          this.isLoading = false;
          return data;
        })
      )
      .subscribe((response) => {
        this.subscribeOffers(response);
        this.selected = [];
      });
  }
}
