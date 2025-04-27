"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirmaController = void 0;
const firma_1 = __importDefault(require("../models/firma"));
class FirmaController {
    constructor() {
        this.dodajNovuFirmu = (req, res) => {
            let novaFirma = new firma_1.default(req.body);
            novaFirma.save().then(msg => {
                res.json({ msg: "firm_added" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveFirme = (req, res) => {
            firma_1.default.find({}).then(f => {
                res.json(f);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiFirmuPoNazivu = (req, res) => {
            let naziv = req.body.naziv;
            firma_1.default.findOne({ 'naziv': naziv }).then(f => {
                res.json(f);
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.FirmaController = FirmaController;
