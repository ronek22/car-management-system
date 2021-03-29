import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent, SelectionType} from "@swimlane/ngx-datatable";
import {Broker} from "../models/models";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {map, switchMap} from "rxjs/operators";
import {empty} from "rxjs";
import {BrokerService} from "../services/broker.service";
import {BrokerDialogComponent} from "./broker-dialog/broker-dialog.component";

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent implements OnInit, AfterViewInit {

isLoading = true;

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  brokers: Broker[];
  selected = [];
  SelectionType = SelectionType;
  columns: any[] = [
    {prop: 'name', name: 'Nazwa'},
  ];

  constructor(private brokerService: BrokerService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.brokerService.getBrokersList().subscribe(response => {
      this.brokers = response;
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

    dialogRef.componentInstance.confirmTitle = 'Usuwanie pracownika';
    dialogRef.componentInstance.confirmMessage = 'Jesteś pewny? Zmiany nie mogą zostać cofnięte.';
    dialogRef.componentInstance.confirmAction = 'USUŃ';

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (!result) {
          return empty();
        }

        return this.brokerService.deleteBroker(this.selected[0].id);
      })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.brokerService.getBrokersList();
      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.brokers = response;
      this.selected = [];
    });
  }

  addBroker(): void {
    const dialogRef = this.dialog.open(BrokerDialogComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (!result) {
        return empty();
      }
      return this.brokerService.addBroker(result);
    })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.brokerService.getBrokersList();
      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.brokers = response;
      this.selected = [];
    });
  }

  editBroker(): void {
    const dialogRef = this.dialog.open(BrokerDialogComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.componentInstance.broker = this.selected[0];

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (!result) {
        return empty();
      }
      return this.brokerService.editBroker(result);
    })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.brokerService.getBrokersList();
      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.brokers = response;
      this.selected = [];
    });
  }

}
