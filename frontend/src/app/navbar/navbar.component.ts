import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../models/models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  pageLinks = [
    { label: 'Oferty', icon: 'local_offer', routerLink: '/offers' },
    { label: 'Pojazdy', icon: 'drive_eta', routerLink: '/vehicles' },
    { label: 'Klienci', icon: 'people', routerLink: '/clients' },
    { label: 'Pracownicy', icon: 'engineering', routerLink: '/employees' },
    { label: 'Brokerzy', icon: 'support_agent', routerLink: '/brokers' },
  ];

  isLoggedIn$: Observable<User>;

    constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
      this.isLoggedIn$ = this.authenticationService.currentUser;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
