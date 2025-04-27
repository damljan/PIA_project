import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { Posao } from 'src/app/models/posao';
import { Firma } from 'src/app/models/firma';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { PosaoService } from 'src/app/services/posao.service';
import { FirmaService } from 'src/app/services/firma.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dekorater-statistika',
  templateUrl: './dekorater-statistika.component.html',
  styleUrls: ['./dekorater-statistika.component.css']
})
export class DekoraterStatistikaComponent implements OnInit {

  dekorater: Korisnik = new Korisnik();
  sviPosloviDekoratera: Posao[] = [];
  firma: Firma = new Firma();
  chartBar: any;
  chartPie: any;
  chartHistogram: any;

  constructor(
    private posaoService: PosaoService,
    private korisnikService: KorisnikService,
    private firmaService: FirmaService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const ulogovan = localStorage.getItem('ulogovan_dekorater') ?? '';

    this.korisnikService.dohvatiKorisnika(ulogovan).subscribe((k: Korisnik) => {
      this.dekorater = k;

      // Dohvati sve firme i pronađi onu u kojoj je dekorater zaposlen
      this.firmaService.dohvatiSveFirme().subscribe((firme: Firma[]) => {
        const firmaFound = firme.find(firma =>
          firma.zaposleni_dekorateri.split(',').map(dekorater => dekorater.trim()).includes(this.dekorater.korisnicko_ime)
        );

        if (firmaFound) {
          this.firma = firmaFound;

          // Prikaz dijagrama nakon što je firma pronađena
          this.posaoService.dohvatiSvePosloveDekoratera(this.dekorater.korisnicko_ime).subscribe((p: Posao[]) => {
            this.sviPosloviDekoratera = p;
            this.prikaziDijagramBrojPoslovaPoMesecima();
            this.prikaziDijagramRaspodelaPoslova();
            this.prikaziDijagramBrojPoslovaPoDanima();
          });
        } else {
          console.error('Dekorater nije pronađen ni u jednoj firmi');
        }
      });
    });
  }


  // 1. Bar dijagram: Broj poslova po mesecima
  prikaziDijagramBrojPoslovaPoMesecima(): void {
    const mesecniPoslovi = new Array(12).fill(0); // Niz sa 12 elemenata za svaki mesec

    this.sviPosloviDekoratera.forEach(posao => {
      const mesec = new Date(posao.zavrsetak).getMonth(); // Dohvati mesec iz datuma
      mesecniPoslovi[mesec] += 1;
    });

    const meseci = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];

    this.chartBar = new Chart('chartBar', {
      type: 'bar',
      data: {
        labels: meseci,
        datasets: [{
          label: 'Broj poslova po mesecima',
          data: mesecniPoslovi,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // 2. Pie dijagram: Raspodela poslova među dekoraterima unutar firme
  prikaziDijagramRaspodelaPoslova(): void {
    const dekorateri = this.firma.zaposleni_dekorateri.split(','); // Dekorateri iz firme
    const posloviPoDekorateru: any = {}; // Kreiramo objekat za brojeve poslova po dekorateru

    let promises = dekorateri.map(dekorater => {
      const imeDekoratera = dekorater.trim();
      posloviPoDekorateru[imeDekoratera] = 0; // Inicijalizuj brojač
      return new Promise<void>((resolve) => {
        this.posaoService.dohvatiSvePosloveDekoratera(imeDekoratera).subscribe((poslovi: Posao[]) => {
          posloviPoDekorateru[imeDekoratera] = poslovi.length; // Postavi broj poslova za dekoratera
          resolve(); // Obaveštavaj da je poziv završen
        });
      });
    });

    // Čekaj sve promise-ove
    Promise.all(promises).then(() => {
      this.updateChart(posloviPoDekorateru);
    });
  }

  private updateChart(posloviPoDekorateru: any): void {
    const dekoraterImena = Object.keys(posloviPoDekorateru);
    const dekoraterBrojeviPoslova = Object.values(posloviPoDekorateru);

    if (dekoraterBrojeviPoslova.length === 0 || dekoraterBrojeviPoslova.every(broj => broj === 0)) {
      console.error('Nema podataka za pie dijagram.');
      return; // Ako nema podataka, izlazi iz funkcije
    }

    this.chartPie = new Chart('chartPie', {
      type: 'pie',
      data: {
        labels: dekoraterImena,
        datasets: [{
          data: dekoraterBrojeviPoslova,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }

  // 3. Histogram: Broj poslova po danima u sedmici u poslednja 24 meseca
  prikaziDijagramBrojPoslovaPoDanima(): void {
    const posloviPoDanima = new Array(7).fill(0); // Niz sa 7 elemenata za dane u nedelji (PON-NED)
    const daniUNedelji = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];

    const danas = new Date();
    const preDveGodine = new Date();
    preDveGodine.setMonth(danas.getMonth() - 24); // Definisanje perioda od 24 meseca

    this.sviPosloviDekoratera.forEach(posao => {
      const zavrsetak = new Date(posao.zavrsetak);
      if (zavrsetak >= preDveGodine && zavrsetak <= danas) {
        const dan = zavrsetak.getDay(); // Dohvati dan u nedelji (0 je Nedelja, 6 je Subota)
        posloviPoDanima[dan] += 1;
      }
    });

    this.chartHistogram = new Chart('chartHistogram', {
      type: 'bar',
      data: {
        labels: daniUNedelji,
        datasets: [{
          label: 'Broj poslova po danima u nedelji (poslednjih 24 meseca)',
          data: posloviPoDanima,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
