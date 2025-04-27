"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('posaoModel', Posao, 'poslovi');
