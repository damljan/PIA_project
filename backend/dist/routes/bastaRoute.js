"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bastaController_1 = require("../controllers/bastaController");
const bastaRouter = express_1.default.Router();
bastaRouter.route('/dodajBastu').post((req, res) => new bastaController_1.BastaController().dodajBastu(req, res));
bastaRouter.route('/dohvatiBastuVlasnika').post((req, res) => new bastaController_1.BastaController().dohvatiBastuVlasnika(req, res));
exports.default = bastaRouter;
