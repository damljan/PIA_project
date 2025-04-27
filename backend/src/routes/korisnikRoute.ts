import express from 'express';
import { KorisnikController } from '../controllers/korisnikController';

const korisnikRouter = express.Router();

korisnikRouter.route('/registracija').post(
    (req, res) => new KorisnikController().registracija(req, res)
)

korisnikRouter.route('/otpremi').post(
    (req, res) => new KorisnikController().otpremi(req, res)
)

korisnikRouter.route('/prijava').post(
    (req, res) => new KorisnikController().prijava(req, res)
)

korisnikRouter.route('/dohvatiSveKorisnike').get(
    (req, res) => new KorisnikController().dohvatiSveKorisnike(req, res)
)

korisnikRouter.route('/promenaLozinke').post(
    (req, res) => new KorisnikController().promenaLozinke(req, res)
)

korisnikRouter.route('/proveraLozinke').post(
    (req, res) => new KorisnikController().proveraLozinke(req, res)
)

korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res) => new KorisnikController().dohvatiKorisnika(req, res)
)

korisnikRouter.route('/dohvatiSveKorisnikeOsimAdmina').get(
    (req, res) => new KorisnikController().dohvatiSveKorisnikeOsimAdmina(req, res)
)

korisnikRouter.route('/azurirajKorisnickoIme').post(
    (req, res) => new KorisnikController().azurirajKorisnickoIme(req, res)
)

korisnikRouter.route('/azurirajAdresu').post(
    (req, res) => new KorisnikController().azurirajAdresu(req, res)
)

korisnikRouter.route('/azurirajKontaktTelefon').post(
    (req, res) => new KorisnikController().azurirajKontaktTelefon(req, res)
)

korisnikRouter.route('/azurirajImejl').post(
    (req, res) => new KorisnikController().azurirajImejl(req, res)
)

korisnikRouter.route('/azurirajKreditnuKarticu').post(
    (req, res) => new KorisnikController().azurirajKreditnuKarticu(req, res)
)

korisnikRouter.route('/azurirajFirmu').post(
    (req, res) => new KorisnikController().azurirajFirmu(req, res)
)

korisnikRouter.route('/azurirajProfilnuSliku').post(
    (req, res) => new KorisnikController().azurirajProfilnuSliku(req, res)
)

korisnikRouter.route('/dohvatiSvePrihvaceneVlasnike').get(
    (req, res) => new KorisnikController().dohvatiSvePrihvaceneVlasnike(req, res)
)

korisnikRouter.route('/dohvatiSveAktivneDekoratere').get(
    (req, res) => new KorisnikController().dohvatiSveAktivneDekoratere(req, res)
)

korisnikRouter.route('/blokirajVlasnika').post(
    (req, res) => new KorisnikController().blokirajVlasnika(req, res)
)

korisnikRouter.route('/blokirajDekoratera').post(
    (req, res) => new KorisnikController().blokirajDekoratera(req, res)
)

korisnikRouter.route('/dohvatiSveVlasnikeNaCekanju').get(
    (req, res) => new KorisnikController().dohvatiSveVlasnikeNaCekanju(req, res)
)

korisnikRouter.route('/prihvatiVlasnika').post(
    (req, res) => new KorisnikController().prihvatiVlasnika(req, res)
)

korisnikRouter.route('/odbijVlasnika').post(
    (req, res) => new KorisnikController().odbijVlasnika(req, res)
)

korisnikRouter.route('/odblokirajDekoratera').post(
    (req, res) => new KorisnikController().odblokirajDekoratera(req, res)
)

korisnikRouter.route('/dohvatiSveBlokiraneDekoratere').get(
    (req, res) => new KorisnikController().dohvatiSveBlokiraneDekoratere(req, res)
)

korisnikRouter.route('/dohvatiSveRegistrovaneVlasnike').get(
    (req, res) => new KorisnikController().dohvatiSveRegistrovaneVlasnike(req, res)
)

korisnikRouter.route('/dohvatiSveRegistrovaneDekoratere').get(
    (req, res) => new KorisnikController().dohvatiSveRegistrovaneDekoratere(req, res)
)

export default korisnikRouter;
