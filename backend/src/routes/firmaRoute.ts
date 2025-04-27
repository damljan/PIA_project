import express from 'express';
import { FirmaController } from '../controllers/firmaController';

const firmaRouter = express.Router();

firmaRouter.route('/dodajNovuFirmu').post(
    (req, res) => new FirmaController().dodajNovuFirmu(req, res)
)

firmaRouter.route('/dohvatiSveFirme').get(
    (req, res) => new FirmaController().dohvatiSveFirme(req, res)
)

firmaRouter.route('/dohvatiFirmuPoNazivu').post(
    (req, res) => new FirmaController().dohvatiFirmuPoNazivu(req, res)
)

export default firmaRouter;