import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Offer} from '../models/models';
import {OfferService} from '../services/offer.service';
import {ColumnMode, DatatableComponent, SelectionType} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-offers',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, AfterViewInit {

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

  constructor(private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.offerService.getOfferList().subscribe(response => {
      this.offers = response.map(offer => ({
        ...offer,
        vehicle: `${offer.car.make.name} ${offer.car.model}`
      }));
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

}
