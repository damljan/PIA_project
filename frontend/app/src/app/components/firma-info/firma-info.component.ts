import { Component, OnInit } from '@angular/core';
import { Firma } from 'src/app/models/firma';
import { FirmaService } from 'src/app/services/firma.service';
import * as L from 'leaflet';
import axios from 'axios';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Korisnik } from 'src/app/models/korisnik';
import { PosaoService } from 'src/app/services/posao.service';
import { Router } from '@angular/router';
import { Posao } from 'src/app/models/posao';
import { Basta } from 'src/app/models/basta';
import { BastaService } from 'src/app/services/basta.service';

@Component({
  selector: 'app-firma-info',
  templateUrl: './firma-info.component.html',
  styleUrls: ['./firma-info.component.css']
})
export class FirmaInfoComponent implements OnInit {

  ulogovan_vlasnik: string = "";

  firma: Firma = new Firma();
  zaposleniDekorateri: Korisnik[] = [];

  odabraneUsluge: { naziv: string }[] = [];

  komentari: string[] = [];
  sviPoslovi: Posao[] = [];

  private map: L.Map | undefined;

  currentStep = 1;

  bastaZaCrtanje: Basta = new Basta();

  datum: string = '';
  vreme: string = '';
  kvadratura: number = 0;
  tipBaste: string = '';

  kvadraturaBazen: number = 0;
  kvadraturaZelenilo: number = 0;
  kvadraturaLezaljke: number = 0;
  kvadraturaStolovi: number = 0;

  kvadraturaFontana: number = 0;
  kvadraturaZeleniloRestoran: number = 0;
  brojStolova: number = 0;
  brojStolica: number = 0;

  dodatniZahtevi: string = '';

  error: string = "";

  constructor(
    private firmaService: FirmaService,
    private korisnikService: KorisnikService,
    private posaoService: PosaoService,
    private bastaService: BastaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan_vlasnik');
    ulogovan = (ulogovan ? ulogovan : '');

    this.ulogovan_vlasnik = ulogovan;

    let naziv_firme = localStorage.getItem('izabrana_firma');
    naziv_firme = (naziv_firme ? naziv_firme : '');

    this.firmaService.dohvatiFirmuPoNazivu(naziv_firme).subscribe((f: Firma) => {
      this.firma = f;
      this.geocodeAddress(this.firma.adresa);

      let kor_imena_dekoratera = this.firma.zaposleni_dekorateri.split(', ');

      for (let i = 0; i < kor_imena_dekoratera.length; i++) {
        this.korisnikService.dohvatiKorisnika(kor_imena_dekoratera[i]).subscribe((k: Korisnik) => {
          this.zaposleniDekorateri[i] = k;
        })
      }

      this.posaoService.dohvatiPoslovePoFirmi(this.firma.naziv).subscribe((p: Posao[]) => {
        this.sviPoslovi = p;

        this.sviPoslovi.forEach(posao => {
          this.komentari.push(posao.komentar);
        })
      })
    });

    this.bastaService.dohvatiBastuVlasnika(ulogovan).subscribe((b: Basta) => {
      this.bastaZaCrtanje = b;
    })
  }

  private geocodeAddress(address: string): void {
    axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        addressdetails: 1
      }
    }).then(response => {
      const results = response.data;
      if (results.length > 0) {
        const { lat, lon } = results[0];
        this.initMap(parseFloat(lat), parseFloat(lon));
      } else {
        console.error('Address not found!');
      }
    }).catch(error => {
      console.error('Geocoding error:', error);
    });
  }

  private initMap(lat: number, lng: number): void {
    this.map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    // Kreiranje ikonice
    const customIcon = L.icon({
      iconUrl: 'assets/pictures/location.png',
      iconSize: [25, 25], // Dimenzije ikonice
      iconAnchor: [12, 25], // Pozicija u odnosu na marker (donja sredina)
      popupAnchor: [0, -25] // Pozicija popup-a u odnosu na marker
    });

    L.marker([lat, lng], { icon: customIcon }).addTo(this.map)
      .bindPopup(`<b>${this.firma.naziv}</b><br>${this.firma.adresa}`)
      .openPopup();
  }

  nextStep() {
    if (!this.datum || !this.vreme || !this.kvadratura || !this.tipBaste) {
      this.error = "Niste uneli sve neophodne podatke!";
      return;
    }

    let danasnji_datum = new Date().toISOString().split('T')[0];
    if (this.datum <= danasnji_datum) {
      this.error = "Nije moguće zakazati posao u prošlosti ili danas za danas!";
      return;
    }

    if (this.kvadratura <= 0) {
      this.error = "Uneta vrednost kvadrature nije validna!";
      return;
    }

    if (!this.slobodniDekorateri()) {
      this.error = "Trenutno nije moguće zakazati uređivanje bašte, jer u firmi nema slobodnih dekoratera!";
      return;
    }

    if (((this.datum + ' ' + this.vreme + ':00') >= this.firma.godisnji_odmor.od) && ((this.datum + ' ' + this.vreme + ':00') < this.firma.godisnji_odmor.do)) {
      this.error = "Nije mogumoguće zakazati uređivanje bašte u ovom terminu, jer su zaposleni firme na odmoru u periodu od " + this.firma.godisnji_odmor.od + " do " + this.firma.godisnji_odmor.do + "!";
      return;
    }

    this.currentStep++;
  }

  /*  prevStep() {
     if (this.currentStep === 2) {
       this.currentStep--;
     }
   } */

  slobodniDekorateri(): boolean {
    if (this.zaposleniDekorateri.length == 0) {
      return false;
    }

    let statusi_dekoratera: string[] = [];
    for (let i = 0; i < this.zaposleniDekorateri.length; i++) {
      statusi_dekoratera[i] = this.zaposleniDekorateri[i].dekorater_status;
    }

    if (!statusi_dekoratera.includes('aktivan')) {
      return false;
    }
    else {
      return true;
    }
  }

  resetError() {
    this.error = "";
  }

  zakazi() {
    if (this.tipBaste == "privatna_basta") {
      if (!this.kvadraturaBazen || !this.kvadraturaZelenilo || !this.kvadraturaLezaljke || !this.kvadraturaStolovi) {
        this.error = "Niste uneli sve neophodne podatke!";
        return;
      }

      if (this.kvadraturaBazen < 0) {
        this.error = "Uneta kvadratura za bazen nije validna!";
        return;
      }

      if (this.kvadraturaZelenilo < 0) {
        this.error = "Uneta kvadratura za zelenilo nije validna!";
        return;
      }

      if (this.kvadraturaLezaljke < 0) {
        this.error = "Uneta kvadratura za ležaljke nije validna!";
        return;
      }

      if (this.kvadraturaStolovi < 0) {
        this.error = "Uneta kvadratura za stolove nije validna!";
        return;
      }

      if (this.kvadratura < (this.kvadraturaBazen + this.kvadraturaZelenilo + this.kvadraturaLezaljke + this.kvadraturaStolovi)) {
        this.error = "Suma pojedinačnih kvadratura premašuje kvadraturu bašte!";
        return;
      }

    }
    else {
      if (!this.kvadraturaFontana || !this.kvadraturaZeleniloRestoran || !this.brojStolova || !this.brojStolica) {
        this.error = "Niste uneli sve neophodne podatke!";
        return;
      }

      if (this.kvadraturaFontana < 0) {
        this.error = "Uneta kvadratura za fontanu nije validna!";
        return;
      }

      if (this.kvadraturaZeleniloRestoran < 0) {
        this.error = "Uneta kvadratura za zelenilo nije validna!";
        return;
      }

      if (this.brojStolova < 0) {
        this.error = "Unet broj stolova nije validan!";
        return;
      }

      if (this.brojStolica < 0) {
        this.error = "Unet broj stolica nije validan!";
        return;
      }

      if (this.kvadratura < (this.kvadraturaFontana + this.kvadraturaZeleniloRestoran + this.brojStolova + 2 * this.brojStolica)) {
        this.error = "Suma pojedinačnih kvadratura premašuje kvadraturu bašte!";
        return;
      }
    }

    // Ako su validacije prošle, pozovi metodu servisa
    const kvadraturaObj = (this.tipBaste === 'privatna_basta') ? {
      ukupna_kvadratura: this.kvadratura,
      kvadratura_bazen: this.kvadraturaBazen,
      kvadratura_zelenilo: this.kvadraturaZelenilo,
      kvadratura_lezaljke: this.kvadraturaLezaljke,
      kvadratura_stolovi: this.kvadraturaStolovi,
    } : {
      ukupna_kvadratura: this.kvadratura,
      kvadratura_fontana: this.kvadraturaFontana,
      kvadratura_zelenilo: this.kvadraturaZeleniloRestoran,
      broj_stolova: this.brojStolova,
      broj_stolica: this.brojStolica
    }

    let pocetak = this.datum + ' ' + this.vreme + ':00';

    this.posaoService.dodajNoviPosao(
      this.ulogovan_vlasnik,
      this.firma.naziv,
      '',
      pocetak,
      '',
      this.tipBaste,
      kvadraturaObj,
      this.odabraneUsluge,
      this.dodatniZahtevi,
      'neobradjen',
      '',
      '',
      0,
      false,
      '',
      ''
    ).subscribe(resp => {
      if (resp['msg'] == 'new_job_added') {
        alert("Zahtev za uređivanjem bašte je evidentiran!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  dodajUslugu(naziv: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    if (checked) {
      this.odabraneUsluge.push({ naziv });
    }
    else {
      this.odabraneUsluge = this.odabraneUsluge.filter(item => item.naziv != naziv);
    }

  }

  private jsonData: any; // Privremena varijabla za čuvanje podataka

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;

    // Proveri da li input ima fajlove
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            this.jsonData = JSON.parse(e.target.result as string); // Čuvanje podataka u varijablu
          }
        };
        reader.readAsText(file);
      } else {
        alert('Molimo vas izaberite .json fajl.');
      }
    } else {
      alert('Nema izabranih fajlova.');
    }
  }

  // Funkcija za slanje podataka na server
  saveToDatabase() {
    if (!this.jsonData) {
      alert('Nema podataka za slanje. Molimo izaberite fajl.');
      return;
    }

    fetch('http://localhost:4000/baste/dodajBastu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.jsonData)
    })
      .then(response => response.json())
      .then(result => {
        alert(result);
        window.location.reload();
        this.jsonData = null; // Resetuj varijablu nakon slanja
      })
      .catch(error => {
        console.error('Greška:', error);
      });
  }

  iscrtajBastu() {
    if (!this.bastaZaCrtanje) return;
  
    const canvas = document.getElementById('mojCanvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d'); // Koristi opcioni chaining
  
    // Proveri da li je kontekst `null`
    if (!ctx) {
      console.error('Greška: Ne mogu da dobijem 2D kontekst za canvas.');
      return;
    }
  
    // Očisti canvas pre crtanja
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Crtaj elemente na osnovu tipa
    this.bastaZaCrtanje.zelenila.forEach(kvadrat => {
      ctx.fillStyle = kvadrat.boja;
      ctx.fillRect(kvadrat.x, kvadrat.y, kvadrat.sirina, kvadrat.visina);
      ctx.strokeStyle = kvadrat.bojaIvice;
      ctx.strokeRect(kvadrat.x, kvadrat.y, kvadrat.sirina, kvadrat.visina);
    });
  
    this.bastaZaCrtanje.bazeni.forEach(pravougaonik => {
      ctx.fillStyle = pravougaonik.boja;
      ctx.fillRect(pravougaonik.x, pravougaonik.y, pravougaonik.sirina, pravougaonik.visina);
      ctx.strokeStyle = pravougaonik.bojaIvice;
      ctx.strokeRect(pravougaonik.x, pravougaonik.y, pravougaonik.sirina, pravougaonik.visina);
    });
  
    this.bastaZaCrtanje.fontane.forEach(krug => {
      ctx.beginPath();
      ctx.arc(krug.x, krug.y, krug.r, 0, Math.PI * 2);
      ctx.fillStyle = krug.boja;
      ctx.fill();
      ctx.strokeStyle = krug.bojaIvice;
      ctx.stroke();
    });
  
    this.bastaZaCrtanje.stolovi.forEach(krug => {
      ctx.beginPath();
      ctx.arc(krug.x, krug.y, krug.r, 0, Math.PI * 2);
      ctx.fillStyle = krug.boja;
      ctx.fill();
      ctx.strokeStyle = krug.bojaIvice;
      ctx.stroke();
    });
  
    this.bastaZaCrtanje.stolice.forEach(pravougaonik => {
      ctx.fillStyle = pravougaonik.boja;
      ctx.fillRect(pravougaonik.x, pravougaonik.y, pravougaonik.sirina, pravougaonik.visina);
      ctx.strokeStyle = pravougaonik.bojaIvice;
      ctx.strokeRect(pravougaonik.x, pravougaonik.y, pravougaonik.sirina, pravougaonik.visina);
    });
  
    this.bastaZaCrtanje.lezaljke.forEach(pravougaonik => {
      ctx.fillStyle = pravougaonik.boja;
      ctx.fillRect(pravougaonik.x, pravougaonik.y, pravougaonik.sirina, pravougaonik.visina);
      ctx.strokeStyle = pravougaonik.bojaIvice;
      ctx.strokeRect(pravougaonik.x, pravougaonik.y, pravougaonik.sirina, pravougaonik.visina);
    });
  }
  

}
