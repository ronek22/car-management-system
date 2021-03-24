import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];


  ngOnInit(): void {
    this.items = [
      {label: 'Oferty', icon: 'local_offer', routerLink: ''},
      {label: 'Pojazdy', icon: 'drive_eta', routerLink: ''},
      {label: 'Klienci', icon: 'people', routerLink: ''},
      {label: 'Pracownicy', icon: 'engineering', routerLink: ''},
      {label: 'Brokerzy', icon: 'support_agent', routerLink: ''},
    ];
  }

}
