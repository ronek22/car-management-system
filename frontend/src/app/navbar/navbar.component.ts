import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  pageLinks = [
    {label: 'Oferty', icon: 'local_offer', routerLink: '/offers'},
    {label: 'Pojazdy', icon: 'drive_eta', routerLink: '/vehicles'},
    {label: 'Klienci', icon: 'people', routerLink: '/clients'},
    {label: 'Pracownicy', icon: 'engineering', routerLink: '/employees'},
    {label: 'Brokerzy', icon: 'support_agent', routerLink: '/brokers'},
  ];

  ngOnInit(): void {}




}
