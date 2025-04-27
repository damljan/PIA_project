"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile_pictures/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = path_1.default.basename(file.originalname, path_1.default.extname(file.originalname)); // Uzimanje originalnog naziva bez ekstenzije
        const ext = path_1.default.extname(file.originalname); // Ekstenzija fajla
        cb(null, `${timestamp}_${originalName}${ext}`);
    }
});
const upload = (0, multer_1.default)({ storage });
class KorisnikController {
    constructor() {
        this.registracija = (req, res) => {
            let noviKorisnik = new korisnik_1.default(req.body);
            if (noviKorisnik.lozinka) {
                bcrypt_1.default.hash(noviKorisnik.lozinka, 10).then(hashedPassword => {
                    noviKorisnik.lozinka = hashedPassword;
                    noviKorisnik.save().then(() => {
                        res.json({ msg: 'added' });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({ msg: 'Greška prilikom čuvanja korisnika' });
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ msg: 'Greška prilikom heširanja lozinke' });
                });
            }
            else {
                res.status(400).json({ msg: 'Lozinka nije uneta' });
            }
        };
        this.otpremi = (req, res) => {
            upload.single('image')(req, res, (err) => {
                if (err instanceof multer_1.default.MulterError) {
                    return res.status(400).json({ error: 'File upload error' });
                }
                else if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (!req.file) {
                    return res.status(400).json({ msg: 'Nije poslata slika' });
                }
                const fileName = req.file.filename;
                return res.status(200).json({ msg: 'ok', filePath: fileName });
            });
        };
        this.prijava = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'korisnicko_ime': korisnicko_ime }).then(korisnik => {
                if (korisnik) {
                    let kripto_lozinka = korisnik.lozinka;
                    if (kripto_lozinka) {
                        bcrypt_1.default.compare(lozinka, kripto_lozinka).then(isMatch => {
                            if (isMatch) {
                                res.json({ korisnik });
                            }
                            else {
                                res.json({ msg: 'bad_password' });
                            }
                        }).catch(err => {
                            res.status(500).json({ msg: 'error_comparing_passwords' });
                        });
                    }
                }
                else {
                    res.json({ msg: 'user_not_found' });
                }
            }).catch(err => {
                res.status(500).json({ msg: 'server_error' });
            });
        };
        this.dohvatiSveKorisnike = (req, res) => {
            korisnik_1.default.find({}).then(k => {
                res.json(k);
            }).catch(err => {
                console.log(err);
            });
        };
        this.proveraLozinke = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'korisnicko_ime': kor_ime }).then(korisnik => {
                if (korisnik) {
                    let kripto_lozinka = korisnik.lozinka;
                    if (kripto_lozinka) {
                        bcrypt_1.default.compare(lozinka, kripto_lozinka).then(isMatch => {
                            if (isMatch) {
                                res.json({ msg: 'ok' });
                            }
                            else {
                                res.json({ msg: 'bad_password' });
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.promenaLozinke = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let nova_lozinka = req.body.nova_lozinka;
            korisnik_1.default.findOne({ 'korisnicko_ime': kor_ime }).then(korisnik => {
                if (korisnik) {
                    if (korisnik.lozinka) {
                        bcrypt_1.default.hash(nova_lozinka, 10).then(hashedPassword => {
                            korisnik.lozinka = hashedPassword;
                            korisnik.save().then(msg => {
                                res.json({ msg: 'updated_password' });
                            }).catch(err => {
                                console.log(err);
                            });
                        });
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiKorisnika = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_1.default.findOne({ 'korisnicko_ime': kor_ime }).then(k => {
                res.json(k);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveKorisnikeOsimAdmina = (req, res) => {
            korisnik_1.default.find({ 'tip': { $ne: 'administrator' } }).then(k => {
                res.json(k);
            }).catch(err => {
                console.log(err);
            });
        };
        this.azurirajKorisnickoIme = (req, res) => {
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let tip = req.body.tip;
            let novo_korisnicko_ime = req.body.novo_korisnicko_ime;
            korisnik_1.default.findOneAndUpdate({ 'ime': ime, 'prezime': prezime, 'tip': tip }, { 'korisnicko_ime': novo_korisnicko_ime }).then(msg => {
                res.json({ msg: "username_updated" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.azurirajAdresu = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let nova_adresa = req.body.nova_adresa;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'adresa': nova_adresa }).then(msg => {
                res.json({ msg: "address_updated" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.azurirajKontaktTelefon = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let novi_kontakt_telefon = req.body.novi_kontakt_telefon;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'kontakt_telefon': novi_kontakt_telefon }).then(msg => {
                res.json({ msg: "phone_updated" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.azurirajImejl = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let novi_imejl = req.body.novi_imejl;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'imejl': novi_imejl }).then(msg => {
                res.json({ msg: "email_updated" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.azurirajKreditnuKarticu = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let novi_broj_kreditne_kartice = req.body.novi_broj_kreditne_kartice;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'kreditna_kartica': novi_broj_kreditne_kartice }).then(msg => {
                res.json({ msg: "card_updated" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.azurirajFirmu = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let nova_firma = req.body.nova_firma;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'dekorater_firma': nova_firma }).then(msg => {
                res.json({ msg: "firm_updated" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.azurirajProfilnuSliku = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let nova_slika = req.body.nova_slika;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'profilna_slika': nova_slika }).then(doc => {
                if (doc) {
                    res.json({ msg: "photo_updated" });
                }
                else {
                    res.status(404).json({ msg: "User not found" });
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({ msg: "Server error" });
            });
        };
        this.dohvatiSvePrihvaceneVlasnike = (req, res) => {
            korisnik_1.default.find({ 'vlasnik_status': 'prihvacen' }).then(v => {
                res.json(v);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveAktivneDekoratere = (req, res) => {
            korisnik_1.default.find({ 'dekorater_status': 'aktivan' }).then(d => {
                res.json(d);
            }).catch(err => {
                console.log(err);
            });
        };
        this.blokirajVlasnika = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'vlasnik_status': 'blokiran' }).then(msg => {
                res.json({ msg: 'owner_blocked' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.blokirajDekoratera = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'dekorater_status': 'blokiran' }).then(msg => {
                res.json({ msg: 'decorator_blocked' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveVlasnikeNaCekanju = (req, res) => {
            korisnik_1.default.find({ 'vlasnik_status': 'naCekanju' }).then(k => {
                res.json(k);
            }).catch(err => {
                console.log(err);
            });
        };
        this.prihvatiVlasnika = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'vlasnik_status': 'prihvacen' }).then(msg => {
                res.json({ msg: "owner_accepted" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.odbijVlasnika = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'vlasnik_status': 'odbijen' }).then(msg => {
                res.json({ msg: "owner_rejected" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.odblokirajDekoratera = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            korisnik_1.default.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { $set: { 'dekorater_status': 'aktivan' } }).then(msg => {
                res.json({ msg: 'decorator_activated' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveBlokiraneDekoratere = (req, res) => {
            korisnik_1.default.find({ 'dekorater_status': 'blokiran' }).then(d => {
                res.json(d);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveRegistrovaneVlasnike = (req, res) => {
            korisnik_1.default.find({ 'tip': 'vlasnik', 'vlasnik_status': 'prihvacen' }).then(k => {
                res.json(k);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveRegistrovaneDekoratere = (req, res) => {
            korisnik_1.default.find({ 'tip': 'dekorater' }).then(k => {
                res.json(k);
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
