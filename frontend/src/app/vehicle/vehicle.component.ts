import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent, SelectionType} from '@swimlane/ngx-datatable';
import {Car} from '../models/models';
import {CarService} from '../services/car.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {map, switchMap} from 'rxjs/operators';
import {empty} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {VehicleDialogComponent} from "./vehicle-dialog/vehicle-dialog.component";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, AfterViewInit {

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  isLoading = true;
  offers: Car[];
  selected = [];
  SelectionType = SelectionType;
  columns: any[] = [
    // {name: 'ID', prop: 'id', sortable: false},
    {prop: 'make.name', name: 'Marka'},
    {prop: 'model', name: 'Model'},
    {prop: 'year', name: 'Rocznik'},
  ];

  constructor(private carService: CarService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.carService.getCarList().subscribe(response => {
      this.offers = response;
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

    dialogRef.componentInstance.confirmTitle = 'Usuwanie pojazdu';
    dialogRef.componentInstance.confirmMessage = 'Jesteś pewny? Zmiany nie mogą zostać cofnięte.';
    dialogRef.componentInstance.confirmAction = 'USUŃ';

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (!result) {
          return empty();
        }

        return this.carService.deleteCar(this.selected[0].id);
      })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.carService.getCarList();

      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.offers = response;
      this.selected = [];

    });
  }

  addVehicle(): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (!result) {
        return empty();
      }
      return this.carService.addCar(result);
    })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.carService.getCarList();
      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.offers = response;
      this.selected = [];
    });
  }

  editVehicle(): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.componentInstance.vehicle = this.selected[0];

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (!result) {
        return empty();
      }
      return this.carService.editCar(result);
    })).pipe(switchMap(() => {
        this.isLoading = true;
        return this.carService.getCarList();
      }),
      map(data => {
        this.isLoading = false;
        return data;
      })).subscribe(response => {
      this.offers = response;
      this.selected = [];
    });
  }

}
