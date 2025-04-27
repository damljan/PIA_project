export class Posao {
    vlasnik: string = "";
    firma: string = "";
    dekorater: string = "";
    pocetak: string = "";
    zavrsetak: string = "";
    tip_baste: string = "";
    kvadratura: any = {};  // any zbog različitih struktura
    odabrane_usluge: {naziv: string}[] = [];
    dodatni_zahtevi: string = "";
    status: string = "";
    fotografija: string = "";
    komentar: string = "";
    ocena: number = 0;
    zakazano_odrzavanje: boolean = false;
    pocetak_odrzavanja: string = "";
    poslednje_odrzavanje: string = "";
    idP: number = 0;
  
    constructor() {
      this.setKvadratura();
    }

    setKvadratura() {
      if (this.tip_baste === 'privatna_basta') {
        this.kvadratura = {
          ukupna_kvadratura: 0,
          kvadratura_bazen: 0,
          kvadratura_zelenilo: 0,
          kvadratura_lezaljke: 0,
          kvadratura_stolovi: 0
        }
      } 
      else if (this.tip_baste === 'basta_restoran') {
        this.kvadratura = {
          ukupna_kvadratura: 0,
          kvadratura_fontana: 0,
          kvadratura_zelenilo: 0,
          broj_stolova: 0,
          broj_stolica: 0
        };
      } 
      else {
        this.kvadratura = {};
      }
    }
  }
  