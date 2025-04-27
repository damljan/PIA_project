import { Usluga } from "./usluga";

export class Firma {
    naziv: string = "";
    adresa: string = "";
    usluge: Usluga[] = [];
    kontakt_telefon: string = "";
    godisnji_odmor: {
        od: string;
        do: string;
    } = {
        od: "",
        do: ""
    };
    zaposleni_dekorateri: string = "";
    imePrezime: string = "";
    prosek: number = 0;
}