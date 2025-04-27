import { Component, OnInit } from '@angular/core';
import { Firma } from 'src/app/models/firma';
import { Posao } from 'src/app/models/posao';
import { FirmaService } from 'src/app/services/firma.service';
import { PosaoService } from 'src/app/services/posao.service';

@Component({
  selector: 'app-dekorater-odrzavanja',
  templateUrl: './dekorater-odrzavanja.component.html',
  styleUrls: ['./dekorater-odrzavanja.component.css']
})
export class DekoraterOdrzavanjaComponent implements OnInit {

  dekorater_firma: Firma = new Firma();

  zakazanaOdrzavanja: Posao[] = [];

  posao: Posao = new Posao();

  isDialogOpen: boolean = false;

  datum_zavrsetka: string = "";
  vreme_zavrsetka: string = "";

  error: string = "";

  constructor(
    private posaoService: PosaoService,
    private firmaService: FirmaService
  ) { }
  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan_dekorater') ?? '';

    this.firmaService.dohvatiSveFirme().subscribe((firme: Firma[]) => {
      for (let firma of firme) {
        if (firma.zaposleni_dekorateri.includes(ulogovan)) {
          this.dekorater_firma = firma;
          break;
        }
      }

      this.posaoService.dohvatiZakazanaOdrzavanjaFirme(this.dekorater_firma.naziv).subscribe((p: Posao[]) => {
        this.zakazanaOdrzavanja = p;
      })
    })
    
  }

  potvrdiZavrsi() {
    if (!this.datum_zavrsetka || !this.vreme_zavrsetka) {
      this.error = "Niste uneli sve neophodne podatke!";
      return;
    }

    if (this.datum_zavrsetka <= this.posao.pocetak_odrzavanja.split(' ')[0]) {
      this.error = "Održavanje se ne može završiti pre nego što je otpočelo!";
      return;
    }

    let zavrsetak_odrzavanja = this.datum_zavrsetka + ' ' + this.vreme_zavrsetka + ':00';

    this.posaoService.potvrdiOdrzavanje(this.posao.idP, zavrsetak_odrzavanja).subscribe(resp => {
      if (resp['msg'] == 'cleaning_accepted') {
        alert("Završetak održavanja je evidentiran!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  odbijOdrzavanje(idP: number) {
    this.posaoService.odbijOdrzavanje(idP).subscribe(resp => {
      if (resp['msg'] == 'cleaning_rejected') {
        alert('Održavanje je odbijeno!');
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  otvoriDialog(p: Posao) {
    this.posao = p;
    this.isDialogOpen = true;
  }

  zatvoriDialog() {
    this.isDialogOpen = false;
  }

  resetError() {
    this.error = "";
  }

}
