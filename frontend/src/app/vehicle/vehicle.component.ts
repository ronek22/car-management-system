import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {Car } from '../models/models';
import {CarService} from '../services/car.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, AfterViewInit{

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  offers: Car[];
  columns: any[] = [
    {name: 'ID', prop: 'id', sortable: false},
    {prop: 'make.name', name: 'Marka'},
    {prop: 'model', name: 'Model'},
    {prop: 'year', name: 'Rocznik'},
  ];

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.carService.getCarList().subscribe(response => {
      this.offers = response;
    });
  }

  ngAfterViewInit(): void {
  this.ngxDatatable.columnMode = ColumnMode.force;
}

}
