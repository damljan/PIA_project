import express from 'express';
import { BastaController } from '../controllers/bastaController';

const bastaRouter = express.Router();

bastaRouter.route('/dodajBastu').post(
    (req, res) => new BastaController().dodajBastu(req, res)
)

bastaRouter.route('/dohvatiBastuVlasnika').post(
    (req, res) => new BastaController().dohvatiBastuVlasnika(req, res)
)

export default bastaRouter;