import { Component, OnInit } from '@angular/core';
import { Firma } from 'src/app/models/firma';
import { Usluga } from 'src/app/models/usluga';
import { FirmaService } from 'src/app/services/firma.service';

@Component({
  selector: 'app-admin-dodavanje-firmi',
  templateUrl: './admin-dodavanje-firmi.component.html',
  styleUrls: ['./admin-dodavanje-firmi.component.css']
})
export class AdminDodavanjeFirmiComponent implements OnInit {

  naziv: string = "";
  adresa: string = "";
  usluge_nazivi: string = "";
  usluge_cene: string = "";
  kontakt_telefon: string = "";
  godisnji_odmor_od: string = "";
  godisnji_odmor_do: string = "";
  zaposleni_dekorateri: string = "";

  error: string = "";
  error_jedinstveni_naziv: string = "";
  error_format_adrese: string = "";
  error_format_telefona: string = "";
  error_god_odmor_od: string = "";
  error_god_odmor_do: string = "";
  error_zaposleni_dekorateri: string = "";
  error_usluge_nazivi: string = "";
  error_usluge_cene: string = "";

  // jedinstveni podaci
  names: Set<string> = new Set<string>();

  constructor(private firmaService: FirmaService) { }

  ngOnInit(): void {
    this.firmaService.dohvatiSveFirme().subscribe((firme: Firma[]) => {
      firme.forEach(firma => {
        this.names.add(firma.naziv);
      })
    })
  }

  registracija() {
    this.resetErrors();

    if (!this.naziv || !this.adresa || !this.kontakt_telefon || !this.usluge_nazivi || !this.usluge_cene ||
      !this.godisnji_odmor_od || !this.godisnji_odmor_do || !this.zaposleni_dekorateri) {
      this.error = "Niste uneli sve neophodne podatke!";
      return;
    }

    if (this.names.has(this.naziv)) {
      this.error_jedinstveni_naziv = "Uneti naziv firme je zauzet!";
      return;
    }

    if (!this.proveraAdrese(this.adresa)) {
      this.error_format_adrese = "Uneta adresa nije u traženom formatu!";
      return;
    }

    if (!this.proveraTelefona(this.kontakt_telefon)) {
      this.error_format_telefona = "Uneti kontakt telefon nije u traženom formatu!";
      return;
    }

    if (!this.proveraGodOdmora(this.godisnji_odmor_od)) {
      this.error_god_odmor_od = "Uneti datum_od nije u traženom formatu!";
      return;
    }

    if (!this.proveraGodOdmora(this.godisnji_odmor_do)) {
      this.error_god_odmor_do = "Uneti datum_do nije u traženom formatu!";
      return;
    }

    if (this.godisnji_odmor_od >= this.godisnji_odmor_do) {
      this.error_god_odmor_od = this.error_god_odmor_do = "Neispravan unos datuma!";
      return;
    }

    if (!this.proveraNazivFormata(this.usluge_nazivi)) {
      this.error_usluge_nazivi = "Nazivi usluga nisu u traženom formatu!";
      return;
    }

    if (!this.proveraCenaFormata(this.usluge_cene)) {
      this.error_usluge_cene = "Cene usluga nisu u traženom formatu";
      return;
    }

    if (this.usluge_cene.split(', ').length !== this.usluge_nazivi.split(',').length) {
      this.error_usluge_nazivi = this.error_usluge_cene = "Neispravan unos naziva i cena!";
      return;
    }

    if ((this.zaposleni_dekorateri.split(', ').length < 2)) {
      this.error_zaposleni_dekorateri = "Firma mora imati barem dva zaposlena dekoratera!";
      return;
    }

    if (!this.proveraNazivFormata(this.zaposleni_dekorateri)) {
      this.error_usluge_nazivi = "Zaposleni dekorateri nisu u traženom formatu!";
      return;
    }

    let usluge: Usluga[] = [];
    let nazivi_usluga: string[] = [];
    let cene_usluga: string[] = [];

    nazivi_usluga = this.usluge_nazivi.split(', ');
    cene_usluga = this.usluge_cene.split(', ');

    for (let i = 0; i < nazivi_usluga.length; i++) {
      usluge.push({
        naziv: nazivi_usluga[i],
        cena: Number(cene_usluga[i])
      });
    }

    this.firmaService.dodajNovuFirmu(
      this.naziv,
      this.adresa,
      usluge,
      this.kontakt_telefon,
      { od: this.godisnji_odmor_od, do: this.godisnji_odmor_do },
      this.zaposleni_dekorateri
    ).subscribe(resp => {
      if (resp['msg'] == 'firm_added') {
        alert("Nova firma je dodata!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  proveraAdrese(adresa: string): boolean {
    const addressRegex = /^[A-Za-zčćžšđČĆŽŠĐ\s]+\s\d+,\s[A-Za-zčćžšđČĆŽŠĐ\s]+,\s[A-Za-zčćžšđČĆŽŠĐ\s]+$/;

    return addressRegex.test(adresa);
  }

  proveraTelefona(telefon: string) {
    const phoneRegex = /^0\d{2}\/\d{4}-\d{3}$/;

    return phoneRegex.test(telefon);
  }

  proveraGodOdmora(god_odmor: string) {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    return dateRegex.test(god_odmor);
  }

  proveraNazivFormata(izraz: string) {
    const textRegex = /^[a-zA-ZčćžšđČĆŽŠĐ\s]+(,\s*[a-zA-ZčćžšđČĆŽŠĐ\s]+)*$/;
  
    return textRegex.test(izraz);
  }

  proveraCenaFormata(izraz: string) {
    const numberRegex = /^(\d+)(,\s*\d+)*$/;

    return numberRegex.test(izraz);
  }

  resetErrors() {
    this.error = "";
    this.error_jedinstveni_naziv = "";
    this.error_format_adrese = "";
    this.error_format_telefona = "";
    this.error_god_odmor_od = "";
    this.error_god_odmor_do = "";
    this.error_zaposleni_dekorateri = "";
    this.error_usluge_nazivi = "";
    this.error_usluge_cene = "";
  }

}
