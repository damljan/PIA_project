import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Firma = new Schema({
    naziv: {
        type: String
    },
    adresa: {
        type: String
    },
    usluge: {
        type: Array
    },
    kontakt_telefon: {
        type: String
    },
    godisnji_odmor: {
        type: Object
    },
    zaposleni_dekorateri: {
        type: String
    }
})

export default mongoose.model('firmaModel', Firma, 'firme');
