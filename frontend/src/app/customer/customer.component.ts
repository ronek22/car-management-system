import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent, SelectionType} from '@swimlane/ngx-datatable';
import {Customer} from '../models/models';
import {CustomerService} from '../services/customer.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {map, switchMap} from 'rxjs/operators';
import {empty} from 'rxjs';
import {CustomerDialogComponent} from './customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {

  isLoading = true;

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  customers: Customer[];
  selected = [];
  SelectionType = SelectionType;
  columns: any[] = [
    {prop: 'first_name', name: 'Imię'},
    {prop: 'last_name', name: 'Nazwisko'},
    {prop: 'phone', name: 'Numer telefonu'},
    {prop: 'email', name: 'Adres email'}
  ];

  constructor(private customerService: CustomerService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.customerService.getCustomersList().subscribe(response => {
      this.customers = response;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.ngxDatatable.columnMode = ColumnMode.force;
  }

  singleSelectCheck = (row: any) => {
    return this.selected.indexOf(row) === -1;
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });

    dialogRef.componentInstance.confirmTitle = 'Usuwanie klienta';
    dialogRef.componentInstance.confirmMessage = 'Jesteś pewny? Zmiany nie mogą zostać cofnięte.';
    dialogRef.componentInstance.confirmAction = 'USUŃ';

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (!result) {
          return empty();
        }

        return this.customerService.deleteCustomer(this.selected[0].id);
      })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.customerService.getCustomersList();

      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.customers = response;
      this.selected = [];

    });
  }

  addCustomer(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (!result) {
        return empty();
      }
      return this.customerService.addCustomer(result);
    })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.customerService.getCustomersList();
      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.customers = response;
      this.selected = [];
    });
  }

  editCustomer(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.componentInstance.customer = this.selected[0];

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (!result) {
        return empty();
      }
      return this.customerService.editCustomer(result);
    })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.customerService.getCustomersList();
      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.customers = response;
      this.selected = [];
    });
  }

}
