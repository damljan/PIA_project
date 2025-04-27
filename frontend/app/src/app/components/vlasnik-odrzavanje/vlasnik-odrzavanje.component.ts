import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posao } from 'src/app/models/posao';
import { PosaoService } from 'src/app/services/posao.service';

@Component({
  selector: 'app-vlasnik-odrzavanje',
  templateUrl: './vlasnik-odrzavanje.component.html',
  styleUrls: ['./vlasnik-odrzavanje.component.css']
})
export class VlasnikOdrzavanjeComponent implements OnInit {

  prethodnaZakazivanja: Posao[] = [];

  vlasnikovaOdrzavanja: Posao[] = [];

  constructor(
    private posaoService: PosaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan_vlasnik');
    ulogovan = (ulogovan ? ulogovan : '');

    this.posaoService.dohvatiPrethodnaZakazivanja(ulogovan).subscribe((p: Posao[]) => {
      this.prethodnaZakazivanja = p;

      this.prethodnaZakazivanja.sort((p1, p2) => {
        if (p1.pocetak < p2.pocetak) {
          return 1;
        }
        else if (p1.pocetak > p2.pocetak) {
          return -1;
        }
        else {
          return 0;
        }
      })
    })

    this.posaoService.dohvatiVlasnikovaOdrzavanja(ulogovan).subscribe((p: Posao[]) => {
      this.vlasnikovaOdrzavanja = p;

      this.vlasnikovaOdrzavanja.sort((p1, p2) => {
        if (p1.pocetak_odrzavanja < p2.pocetak_odrzavanja) {
          return 1;
        }
        else if (p1.pocetak_odrzavanja > p2.pocetak_odrzavanja) {
          return -1;
        }
        else {
          return 0;
        }
      })
    })
  }

  proveraSestMeseci(datum_zavrsetka: string, datum_poslednjeg_odrzavanja: string, status: boolean): boolean {
    if (status == false) {
      let datum: string = "";
      let danasnji_datum: string = "";
      
      datum = (datum_poslednjeg_odrzavanja == '' ? datum_zavrsetka.split(' ')[0] : datum_poslednjeg_odrzavanja.split(' ')[0]);
      danasnji_datum = new Date().toISOString().split('T')[0];

      let datum_odrzavanja = new Date(datum);
      let danasnji_dan = new Date(danasnji_datum);

      let razlika_godine = danasnji_dan.getFullYear() - datum_odrzavanja.getFullYear();
      let razlika_meseci = danasnji_dan.getMonth() - datum_odrzavanja.getMonth();

      let ukupno_meseci = razlika_godine * 12 + razlika_meseci;

      // return true ako je prošlo više od 6 meseci
      return ukupno_meseci >= 6;
    }
    else {
      return false;
    } 
}

zakaziOdrzavanje(idP: number) {
  localStorage.setItem('posao_za_odrzavanje', JSON.stringify(idP));
  this.router.navigate(['odrzavanje-zakazivanje']);
}
  

}
