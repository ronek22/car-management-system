import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {Car, Customer} from '../models/models';
import {CarService} from '../services/car.service';
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {

  loadingIndicator = true;

 @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  customers: Customer[];
  columns: any[] = [
    {prop: 'first_name', name: 'Imię'},
    {prop: 'last_name', name: 'Nazwisko'},
    {prop: 'phone', name: 'Numer telefonu'},
    {prop: 'email', name: 'Adres email'}
  ];

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getCustomersList().subscribe(response => {
      this.customers = response;
      this.loadingIndicator = false;
    });
  }

  ngAfterViewInit(): void {
  this.ngxDatatable.columnMode = ColumnMode.force;
}

}
