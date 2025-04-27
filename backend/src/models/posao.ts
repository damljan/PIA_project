import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Posao = new Schema({
    vlasnik: {
        type: String
    },
    firma: {
        type: String
    },
    dekorater: {
        type: String
    },
    pocetak: {
        type: String
    },
    zavrsetak: {
        type: String
    },
    tip_baste: {
        type: String
    },
    kvadratura: {
        type: Object
    },
    odabrane_usluge: {
        type: Array
    },
    dodatni_zahtevi: {
        type: String
    },
    status: {
        type: String
    },
    fotografija: {
        type: String
    },
    komentar: {
        type: String
    },
    ocena: {
        type: Number
    },
    zakazano_odrzavanje: {
        type: Boolean
    },
    pocetak_odrzavanja: {
        type: String
    },
    poslednje_odrzavanje: {
        type: String
    },
    idP: {
        type: Number
    }
})

export default mongoose.model('posaoModel', Posao, 'poslovi');