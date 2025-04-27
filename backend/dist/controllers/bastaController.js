"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BastaController = void 0;
const basta_1 = __importDefault(require("../models/basta"));
class BastaController {
    constructor() {
        this.dodajBastu = (req, res) => {
            let novaBasta = new basta_1.default(req.body);
            novaBasta.save().then(msg => {
                res.json('JSON fajl bašte je postavljen!');
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiBastuVlasnika = (req, res) => {
            let vlasnik = req.body.vlasnik;
            basta_1.default.findOne({ 'vlasnik': vlasnik }).then(b => {
                res.json(b);
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.BastaController = BastaController;
