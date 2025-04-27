import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }

  idiNaSpiskove() {
    this.router.navigate(['admin-spiskovi']);
  }

  idiNaAzuriranja() {
    this.router.navigate(['admin-azuriranja']);
  }

  idiNaDeaktivacije() {
    this.router.navigate(['admin-deaktivacije']);
  }

  idiNaZahteve() {
    this.router.navigate(['admin-zahtevi']);
  }

  idiNaDodavanjeDekoratera() {
    this.router.navigate(['admin-dodavanje-dekoratera']);
  }

  idiNaDodavanjeFirmi() {
    this.router.navigate(['admin-dodavanje-firmi']);
  }

}
