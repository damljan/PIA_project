import express from 'express';
import { PosaoController } from '../controllers/posaoController';

const posaoRouter = express.Router();

posaoRouter.route('/dodajNoviPosao').post(
    (req, res) => new PosaoController().dodajNoviPosao(req, res)
)

posaoRouter.route('/dohvatiPoslovePoFirmi').post(
    (req, res) => new PosaoController().dohvatiPoslovePoFirmi(req, res)
)

posaoRouter.route('/dohvatiTrenutnaZakazivanja').post(
    (req, res) => new PosaoController().dohvatiTrenutnaZakazivanja(req, res)
)

posaoRouter.route('/dohvatiPrethodnaZakazivanja').post(
    (req, res) => new PosaoController().dohvatiPrethodnaZakazivanja(req, res)
)

posaoRouter.route('/otkaziPosao').post(
    (req, res) => new PosaoController().otkaziPosao(req, res)
)

posaoRouter.route('/dodelaKomentaraOcene').post(
    (req, res) => new PosaoController().dodelaKomentaraOcene(req, res)
)

posaoRouter.route('/zakaziOdrzavanje').post(
    (req, res) => new PosaoController().zakaziOdrzavanje(req, res)
)

posaoRouter.route('/dohvatiVlasnikovaOdrzavanja').post(
    (req, res) => new PosaoController().dohvatiVlasnikovaOdrzavanja(req, res)
)

posaoRouter.route('/dohvatiNeobradjeneZaFirmu').post(
    (req, res) => new PosaoController().dohvatiNeobradjeneZaFirmu(req, res)
)

posaoRouter.route('/potvrdiPosao').post(
    (req, res) => new PosaoController().potvrdiPosao(req, res)
)

posaoRouter.route('/odbijPosao').post(
    (req, res) => new PosaoController().odbijPosao(req, res)
)

posaoRouter.route('/dohvatiZaduzenjaDekoratera').post(
    (req, res) => new PosaoController().dohvatiZaduzenjaDekoratera(req, res)
)

posaoRouter.route('/otpremi').post(
    (req, res) => new PosaoController().otpremi(req, res)
)

posaoRouter.route('/zavrsiPosao').post(
    (req, res) => new PosaoController().zavrsiPosao(req, res)
)

posaoRouter.route('/dohvatiZakazanaOdrzavanjaFirme').post(
    (req, res) => new PosaoController().dohvatiZakazanaOdrzavanjaFirme(req, res)
)

posaoRouter.route('/potvrdiOdrzavanje').post(
    (req, res) => new PosaoController().potvrdiOdrzavanje(req, res)
)

posaoRouter.route('/odbijOdrzavanje').post(
    (req, res) => new PosaoController().odbijOdrzavanje(req, res)
)

posaoRouter.route('/dohvatiSvePosloveDekoratera').post(
    (req, res) => new PosaoController().dohvatiSvePosloveDekoratera(req, res)
)

posaoRouter.route('/dohvatiSveOcenjenePoslovePoFirmi').post(
    (req, res) => new PosaoController().dohvatiSveOcenjenePoslovePoFirmi(req, res)
)

posaoRouter.route('/dohvatiSveZavrsenePoslove').get(
    (req, res) => new PosaoController().dohvatiSveZavrsenePoslove(req, res)
)

posaoRouter.route('/dohvatiSvePotvrdjenePoslove').get(
    (req, res) => new PosaoController().dohvatiSvePotvrdjenePoslove(req, res)
)

posaoRouter.route('/dohvatiSveZavrsenePosloveSaFoto').get(
    (req, res) => new PosaoController().dohvatiSveZavrsenePosloveSaFoto(req, res)
)

export default posaoRouter;