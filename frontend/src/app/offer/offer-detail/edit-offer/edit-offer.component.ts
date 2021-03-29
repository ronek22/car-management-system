import {Component, Inject, OnInit} from '@angular/core';
import {Broker, EditOffer} from "../../../models/models";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit {

  offerForm: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public offer: EditOffer,
              public dialogRef: MatDialogRef<EditOfferComponent>) {
  }

  ngOnInit(): void {
    this.offerForm = this.fb.group({
      id: [this.offer.id],
      payForTransport: [this.offer.pay_for_transport],
      shipDocumentsToAgency: [this.offer.ship_documents_to_agency],
      additionalData: [this.offer.additional_data],
      overFracht: [this.offer.over_fracht],
      overOdprawa: [this.offer.over_odprawa],
      overTransportToPl: [this.offer.over_transport_to_pl],
      overHST: [this.offer.over_hst]
    });
  }

  getData(): void {
    this.offer = {
      id: this.offer.id,
      pay_for_transport: this.offerForm.value['payForTransport'] ? formatDate(this.offerForm.value['payForTransport'], 'yyyy-MM-dd', 'en_US') : null,
      ship_documents_to_agency: this.offerForm.value['shipDocumentsToAgency'] ? formatDate(this.offerForm.value['shipDocumentsToAgency'], 'yyyy-MM-dd', 'en_US') : null,
      additional_data: this.offerForm.value['additionalData'],
      over_fracht: this.offerForm.value['overFracht'],
      over_odprawa: this.offerForm.value['overOdprawa'],
      over_transport_to_pl: this.offerForm.value['overTransportToPl'],
      over_hst: this.offerForm.value['overHST']
    } as EditOffer;

    this.dialogRef.close(this.offer);
  }

}
