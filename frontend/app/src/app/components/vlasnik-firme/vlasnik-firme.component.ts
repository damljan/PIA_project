import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firma } from 'src/app/models/firma';
import { Korisnik } from 'src/app/models/korisnik';
import { Posao } from 'src/app/models/posao';
import { FirmaService } from 'src/app/services/firma.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { PosaoService } from 'src/app/services/posao.service';

@Component({
  selector: 'app-vlasnik-firme',
  templateUrl: './vlasnik-firme.component.html',
  styleUrls: ['./vlasnik-firme.component.css']
})
export class VlasnikFirmeComponent implements OnInit {

  sveFirme: Firma[] = [];

  naziv: string = "";
  adresa: string = "";

  poruka: string = "";

  constructor(
    private korisnikService: KorisnikService,
    private firmaService: FirmaService,
    private posaoService: PosaoService,
    private router: Router) { }

  ngOnInit(): void {

    this.firmaService.dohvatiSveFirme().subscribe((firme: Firma[]) => {
      this.sveFirme = firme;


      for (let i = 0; i < this.sveFirme.length; i++) {
        let korisnicka_imena = this.sveFirme[i].zaposleni_dekorateri.split(', ');
        let imenaPrezimena: string[] = [];
        let brojKorisnika = korisnicka_imena.length;
        let dohvateniKorisnici = 0;

        for (let j = 0; j < korisnicka_imena.length; j++) {
          this.korisnikService.dohvatiKorisnika(korisnicka_imena[j]).subscribe((k: Korisnik) => {

            imenaPrezimena[j] = k.ime + ' ' + k.prezime;
            dohvateniKorisnici++;


            if (dohvateniKorisnici === brojKorisnika) {
              this.sveFirme[i].imePrezime = imenaPrezimena.join(', ');
            }
          });
        }
      }

      for (let i = 0; i < this.sveFirme.length; i++) {
        this.posaoService.dohvatiSveOcenjenePoslovePoFirmi(this.sveFirme[i].naziv).subscribe((poslovi: Posao[]) => {
          if (poslovi.length !== 0) {
            const suma = poslovi.reduce((accumulator, posao) => accumulator + posao.ocena, 0);
            this.sveFirme[i].prosek = suma / poslovi.length;
          } else {
            this.sveFirme[i].prosek = 0;
          }
        });
      }

    });
  }

  sortirajNerastucePoNazivu() {
    this.sveFirme.sort(
      (f1, f2) => {
        if (f1.naziv > f2.naziv) {
          return -1;
        }
        else if (f1.naziv < f2.naziv) {
          return 1;
        }
        else {
          return 0;
        }
      }
    )
  }

  sortirajNeopadajucePoNazivu() {
    this.sveFirme.sort(
      (f1, f2) => {
        if (f1.naziv > f2.naziv) {
          return 1;
        }
        else if (f1.naziv < f2.naziv) {
          return -1;
        }
        else {
          return 0;
        }
      }
    )
  }

  sortirajNerastucePoAdresi() {
    this.sveFirme.sort(
      (f1, f2) => {
        if (f1.adresa > f2.adresa) {
          return -1;
        }
        else if (f1.adresa < f2.adresa) {
          return 1;
        }
        else {
          return 0;
        }
      }
    )
  }

  sortirajNeopadajucePoAdresi() {
    this.sveFirme.sort(
      (f1, f2) => {
        if (f1.adresa > f2.adresa) {
          return 1;
        }
        else if (f1.adresa < f2.adresa) {
          return -1;
        }
        else {
          return 0;
        }
      }
    )
  }

  usmeriNaFirmu(naziv: string) {
    localStorage.setItem('izabrana_firma', naziv);
    this.router.navigate(['firma-info']);
  }

  pretraziFirmu() {
    this.poruka = "";

    if (!this.naziv && !this.adresa) {
      this.ngOnInit();
      return;
    }

    let filtriraneFirme = this.sveFirme.filter(firma => {
      let nazivMatch = this.naziv ? firma.naziv.toLowerCase().includes(this.naziv.toLowerCase()) : true;
      let adresaMatch = this.adresa ? firma.adresa.toLowerCase().includes(this.adresa.toLowerCase()) : true;
      return nazivMatch && adresaMatch;
    });

    if (filtriraneFirme.length > 0) {
      this.sveFirme = filtriraneFirme;
      this.poruka = "";
    } else {
      this.sveFirme = [];
      this.poruka = "Nema firmi sa unetim parametrom pretrage!";
    }
  }


  resetErrors() {
    this.poruka = "";
  }

}
