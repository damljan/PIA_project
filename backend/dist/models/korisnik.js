"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Korisnik = new Schema({
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
});
exports.default = mongoose_1.default.model('korisnikModel', Korisnik, 'korisnici');
