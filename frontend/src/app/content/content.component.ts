import {Component, OnInit} from '@angular/core';
import {Offer} from "../models/models";
import {OfferService} from "../services/offer.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  offers: Offer[];
  cols: any[];

  constructor(private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.offerService.getOfferList().subscribe(response => {
      this.offers = response;
    });

  }

}
