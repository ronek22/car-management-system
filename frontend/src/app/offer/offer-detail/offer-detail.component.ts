import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../models/models";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  offer: Offer;

  constructor(private route: ActivatedRoute, private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.offerService.getOfferDetail(+params['id']))
    )
      .subscribe(result => {
        this.offer = result;
      });
  }
}
