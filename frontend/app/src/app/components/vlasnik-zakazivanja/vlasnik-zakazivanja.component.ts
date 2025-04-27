import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posao } from 'src/app/models/posao';
import { PosaoService } from 'src/app/services/posao.service';

@Component({
  selector: 'app-vlasnik-zakazivanja',
  templateUrl: './vlasnik-zakazivanja.component.html',
  styleUrls: ['./vlasnik-zakazivanja.component.css']
})
export class VlasnikZakazivanjaComponent implements OnInit {

  ulogovan_vlasnik: string = "";

  trenutnaZakazivanja: Posao[] = [];
  prethodnaZakazivanja: Posao[] = [];

  constructor(
    private posaoService: PosaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan_vlasnik');
    ulogovan = (ulogovan ? ulogovan : '');

    this.ulogovan_vlasnik = ulogovan;

    this.posaoService.dohvatiTrenutnaZakazivanja(this.ulogovan_vlasnik).subscribe((p: Posao[]) => {
      this.trenutnaZakazivanja = p;

      this.trenutnaZakazivanja.sort((p1, p2) => {
        if (p1.pocetak < p2.pocetak) {
          return -1;
        }
        else if (p1.pocetak > p2.pocetak) {
          return 1;
        }
        else {
          return 0;
        }
      })
    })

    this.posaoService.dohvatiPrethodnaZakazivanja(this.ulogovan_vlasnik).subscribe((p: Posao[]) => {
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
  }

  daLiJeOtkaziOnemoguceno(pocetak: string): boolean {
    const [datum, vreme] = pocetak.split(' ');
    const [godina, mesec, dan] = datum.split('-').map(Number);
    const [sati, minuti, sekunde] = vreme.split(':').map(Number);
    const datumPocetka = new Date(godina, mesec - 1, dan, sati, minuti, sekunde);
    const trenutniDatum = new Date();
    const razlikaVremena = datumPocetka.getTime() - trenutniDatum.getTime();
    const razlikaDana = Math.floor(razlikaVremena / (1000 * 60 * 60 * 24));

    return razlikaDana < 1;
  }

  otkaziPosao(idP: number) {
    this.posaoService.otkaziPosao(idP).subscribe(resp => {
      if (resp['msg'] == 'job_deleted') {
        alert("Posao je uspešno otkazan!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  dodajKomentarOcenu(idP: number) {
    localStorage.setItem('komentar_ocena_posao', JSON.stringify(idP));
    this.router.navigate(['komentar-ocena']);
  }
}
