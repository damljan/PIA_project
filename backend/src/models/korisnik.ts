import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik =  new Schema({
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    adresa: {
        type: String
    },
    kontakt_telefon: {
        type: String
    },
    imejl: {
        type: String
    },
    profilna_slika: {
        type: String
    },
    kreditna_kartica: {
        type: String
    },
    tip: {
        type: String
    },
    vlasnik_status: {
        type: String
    },
    dekorater_status: {
        type: String
    },
    dekorater_firma: {
        type: String
    }
})

export default mongoose.model('korisnikModel', Korisnik, 'korisnici');