import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosaoService } from 'src/app/services/posao.service';

@Component({
  selector: 'app-komentar-ocena',
  templateUrl: './komentar-ocena.component.html',
  styleUrls: ['./komentar-ocena.component.css']
})
export class KomentarOcenaComponent implements OnInit {

  posao: number = 0;

  komentar: string = "";
  ocena: string = "";

  error: string = "";

  constructor(
    private posaoService: PosaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
   let posao = localStorage.getItem('komentar_ocena_posao');
   posao = (posao ? posao : '');

   this.posao = JSON.parse(posao);
  }

  dodaj() {
    if(!this.komentar || !this.ocena) {
      this.error = "Niste uneli sve neophodne podatke!";
      return;
    }
    this.posaoService.dodelaKomentaraOcene(this.posao, this.komentar, (Number)(this.ocena)).subscribe(resp => {
      if (resp['msg'] == 'ok') {
        alert('Hvala na povratnim informacijama!');
        localStorage.removeItem('komentar_ocena_posao');
        this.router.navigate(['vlasnik-zakazivanja']);
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
