import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firma } from 'src/app/models/firma';
import { Korisnik } from 'src/app/models/korisnik';
import { Posao } from 'src/app/models/posao';
import { FirmaService } from 'src/app/services/firma.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { PosaoService } from 'src/app/services/posao.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  sviZavrseniPoslovi: Posao[] = [];
  sviRegistrovaniVlasnici: Korisnik[] = [];
  sviRegistrovaniDekorateri: Korisnik[] = [];
  sviPotvrdjeniPoslovi: Posao[] = [];

  // Brojevi za prikaz
  zakazaniPoslovi24h: number = 0;
  zakazaniPoslovi7d: number = 0;
  zakazaniPoslovi30d: number = 0;
  ukupanBrojDekorisanihBasta: number = 0;
  ukupanBrojVlasnika: number = 0;
  ukupanBrojDekoratEra: number = 0;

  sveFirme: Firma[] = [];

  naziv: string = "";
  adresa: string = "";

  poruka: string = "";

  zavrseniPosloviFoto: Posao[] = [];


  constructor(
    private korisnikService: KorisnikService,
    private firmaService: FirmaService,
    private posaoService: PosaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.posaoService.dohvatiSveZavrsenePoslove().subscribe((p: Posao[]) => {
      this.sviZavrseniPoslovi = p;
      this.ukupanBrojDekorisanihBasta = this.sviZavrseniPoslovi.length;
    })

    this.posaoService.dohvatiSvePotvrdjenePoslove().subscribe((p: Posao[]) => {
      this.sviPotvrdjeniPoslovi = p;

      // Izračunajte zakazane poslove u poslednjih 24h, 7d, i 30d
      this.zakazaniPoslovi24h = this.brojZakazanihPoslova(1);
      this.zakazaniPoslovi7d = this.brojZakazanihPoslova(7);
      this.zakazaniPoslovi30d = this.brojZakazanihPoslova(30);
    })

    this.korisnikService.dohvatiSveRegistrovaneVlasnike().subscribe((k: Korisnik[]) => {
      this.sviRegistrovaniVlasnici = k;
      this.ukupanBrojVlasnika = k.length;
    })

    this.korisnikService.dohvatiSveRegistrovaneDekoratere().subscribe((k: Korisnik[]) => {
      this.sviRegistrovaniDekorateri = k;
      this.ukupanBrojDekoratEra = k.length;
    })

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

    });

    this.posaoService.dohvatiSveZavrsenePosloveSaFoto().subscribe((p: Posao[]) => {
      this.zavrseniPosloviFoto = p;
    })
  }

  // Funkcija za brojanje zakazanih poslova u poslednjih 'dani' dana
  private brojZakazanihPoslova(dani: number): number {
    const now = new Date();
    const timeDiff = now.getTime() - (dani * 24 * 60 * 60 * 1000);
    return this.sviPotvrdjeniPoslovi.filter(posao => {
      const pocetak = new Date(posao.pocetak);
      return pocetak.getTime() >= timeDiff && pocetak.getTime() <= now.getTime();
    }).length;
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

  selectedImage: string | null = null;

    openModal(image: string) {
        this.selectedImage = image;
    }

    closeModal() {
        this.selectedImage = null;
    }


  resetErrors() {
    this.poruka = "";
  }

}
