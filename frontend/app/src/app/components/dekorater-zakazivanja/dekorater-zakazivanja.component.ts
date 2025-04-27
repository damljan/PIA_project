import { Component, OnInit } from '@angular/core';
import { Firma } from 'src/app/models/firma';
import { Posao } from 'src/app/models/posao';
import { FirmaService } from 'src/app/services/firma.service';
import { PosaoService } from 'src/app/services/posao.service';

@Component({
  selector: 'app-dekorater-zakazivanja',
  templateUrl: './dekorater-zakazivanja.component.html',
  styleUrls: ['./dekorater-zakazivanja.component.css']
})
export class DekoraterZakazivanjaComponent implements OnInit {

  zavrsenPosao: Posao = new Posao();

  dekorater_firma: Firma = new Firma();

  komentar: string = "";

  neobradjeniPosloviFirme: Posao[] = [];
  zaduzenjaDekoratera: Posao[] = [];

  selectedFile: File | undefined;

  isDialogOpen = false;

  datum_zavrsetka: string = "";
  vreme_zavrsetka: string = "";

  error: string = "";

  constructor(
    private firmaService: FirmaService,
    private posaoService: PosaoService
  ) { }

  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan_dekorater') ?? '';

    this.firmaService.dohvatiSveFirme().subscribe((firme: Firma[]) => {
      for (let firma of firme) {
        if (firma.zaposleni_dekorateri.includes(ulogovan)) {
          this.dekorater_firma = firma;
          break;  // Prekini petlju kad pronađeš firmu
        }
      }

      this.posaoService.dohvatiNeobradjeneZaFirmu(this.dekorater_firma.naziv).subscribe((p: Posao[]) => {
        this.neobradjeniPosloviFirme = p;

        this.neobradjeniPosloviFirme.sort((p1, p2) => {
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

        this.posaoService.dohvatiZaduzenjaDekoratera(ulogovan).subscribe((p: Posao[]) => {
          this.zaduzenjaDekoratera = p;

          this.zaduzenjaDekoratera.sort((p1, p2) => {
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
      })
    })
  }

  potvrdiPosao(idP: number) {
    let ulogovan = localStorage.getItem('ulogovan_dekorater') ?? '';
    this.posaoService.potvrdiPosao(idP, ulogovan).subscribe(resp => {
      if (resp['msg'] == 'job_accepted') {
        alert('Posao je uspešno potvrđen!');
        window.location.reload();
      }
      else {
        alert('Akcija nije uspela!');
      }
    })
  }

  odbijPosao(p: Posao) {
    if (!p.komentar) {
      alert("Komentar kod odbijenice je obavezan!");
      return;
    }

    let ulogovan = localStorage.getItem('ulogovan_dekorater') ?? '';
    this.posaoService.odbijPosao(p.idP, ulogovan, p.komentar).subscribe(resp => {
      if (resp['msg'] == 'job_rejected') {
        alert('Posao je odbijen!');
        window.location.reload();
      }
      else {
        alert('Akcija nije uspela!');
      }
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.error = "";
    }
  }

  otvoriDialog(p: Posao) {
    this.zavrsenPosao = p;
    this.isDialogOpen = true;
  }

  zatvoriDialog() {
    this.isDialogOpen = false;
  }

  potvrdiZavrsi() {
    if (!this.datum_zavrsetka || !this.vreme_zavrsetka || !this.selectedFile) {
      this.error = "Niste uneli sve neophodne podatke!";
      return;
    }

    if (this.datum_zavrsetka <= this.zavrsenPosao.pocetak.split(' ')[0]) {
      this.error = "Posao se ne može završiti pre nego što je otpočeo!";
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(this.selectedFile);

    img.onload = () => {
      this.posaoService.otpremi(this.selectedFile!).subscribe((resp: UploadResponse) => {
        if (resp.msg === 'ok') {
          let zavrsetak = this.datum_zavrsetka + ' ' + this.vreme_zavrsetka + ':00';
          this.posaoService.zavrsiPosao(this.zavrsenPosao.idP, zavrsetak, resp.filePath).subscribe(resp => {
            if (resp['msg'] == 'job_ended') {
              alert("Završetak posla je evidentiran!");
              window.location.reload();
            }
            else {
              alert("Akcija nije uspela!");
            }
          })
        }
        else {
          alert("Greska pri otpremanju fotografije!");
        }
      })
    }
  }

  resetError() {
    this.error = "";
  }
}

// Interfejs za tipizaciju server odgovora
interface UploadResponse {
  msg: string;
  filePath: string;
}
