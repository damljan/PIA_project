import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosaoService } from 'src/app/services/posao.service';

@Component({
  selector: 'app-odrzavanje-zakazivanje',
  templateUrl: './odrzavanje-zakazivanje.component.html',
  styleUrls: ['./odrzavanje-zakazivanje.component.css']
})
export class OdrzavanjeZakazivanjeComponent implements OnInit {

  datum: string = "";
  vreme: string = "";

  error: string = "";

  constructor(
    private posaoService: PosaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
   
  }

  zakazi() {
    if (!this.datum || !this.vreme) {
      this.error = "Niste uneli sve neophodne podatke!";
      return;
    }
  
    let danasnji_datum = new Date().toISOString().split('T')[0];
    if (this.datum <= danasnji_datum) {
      this.error = "Nije moguće zakazati posao u prošlosti ili danas za danas!";
      return;
    }

    let posao_za_odrzavanje = localStorage.getItem('posao_za_odrzavanje');
    posao_za_odrzavanje = (posao_za_odrzavanje ? posao_za_odrzavanje: '');

    let posao = JSON.parse(posao_za_odrzavanje);

    let pocetak_odrzavanja = this.datum + ' ' + this.vreme + ':00';
  
    this.posaoService.zakaziOdrzavanje(posao, pocetak_odrzavanja).subscribe(resp => {
      if (resp['msg'] == 'ok') {
        alert("Željeni termin održavanja je evidentiran!");
        localStorage.removeItem('posao_za_odrzavanje');
        this.router.navigate(['vlasnik-odrzavanje']);
      }
      else {
        alert('Akcija nije uspela!');
      }
    })
    
  }

  resetError() {
    this.error = "";
  }
  
}
