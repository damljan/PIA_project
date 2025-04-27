"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('firmaModel', Firma, 'firme');
