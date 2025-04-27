"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firmaController_1 = require("../controllers/firmaController");
const firmaRouter = express_1.default.Router();
firmaRouter.route('/dodajNovuFirmu').post((req, res) => new firmaController_1.FirmaController().dodajNovuFirmu(req, res));
firmaRouter.route('/dohvatiSveFirme').get((req, res) => new firmaController_1.FirmaController().dohvatiSveFirme(req, res));
firmaRouter.route('/dohvatiFirmuPoNazivu').post((req, res) => new firmaController_1.FirmaController().dohvatiFirmuPoNazivu(req, res));
exports.default = firmaRouter;
