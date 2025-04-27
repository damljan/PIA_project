"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosaoController = void 0;
const posao_1 = __importDefault(require("../models/posao"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/garden_pictures/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = path_1.default.basename(file.originalname, path_1.default.extname(file.originalname)); // Uzimanje originalnog naziva bez ekstenzije
        const ext = path_1.default.extname(file.originalname); // Ekstenzija fajla
        cb(null, `${timestamp}_${originalName}${ext}`);
    }
});
const upload = (0, multer_1.default)({ storage });
class PosaoController {
    constructor() {
        this.dodajNoviPosao = (req, res) => {
            let noviPosao = new posao_1.default(req.body);
            let noviId = 0;
            posao_1.default.find({}).then(poslovi => {
                if (poslovi) {
                    let ids = [];
                    for (let i = 0; i < poslovi.length; i++) {
                        if (poslovi[i].idP != null && poslovi[i].idP != undefined) {
                            ids[i] = poslovi[i].idP;
                        }
                    }
                    if (ids.length == 0) {
                        noviId = 1;
                    }
                    else {
                        ids.sort((a, b) => b - a);
                        noviId = ids[0] + 1;
                    }
                    noviPosao.idP = noviId;
                    noviPosao.save().then(msg => {
                        res.json({ msg: 'new_job_added' });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiPoslovePoFirmi = (req, res) => {
            let naziv_firme = req.body.naziv_firme;
            posao_1.default.find({ 'firma': naziv_firme, 'komentar': { $ne: '' } }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiTrenutnaZakazivanja = (req, res) => {
            let vlasnik = req.body.vlasnik;
            posao_1.default.find({ 'vlasnik': vlasnik, 'status': 'neobradjen' }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiPrethodnaZakazivanja = (req, res) => {
            let vlasnik = req.body.vlasnik;
            posao_1.default.find({ 'vlasnik': vlasnik, 'status': 'zavrsen' }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.otkaziPosao = (req, res) => {
            let idP = req.body.idP;
            posao_1.default.deleteOne({ 'idP': idP }).then(msg => {
                res.json({ msg: 'job_deleted' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dodelaKomentaraOcene = (req, res) => {
            let idP = req.body.idP;
            let komentar = req.body.komentar;
            let ocena = req.body.ocena;
            posao_1.default.findOneAndUpdate({ 'idP': idP }, { $set: { 'komentar': komentar, 'ocena': ocena } }).then(msg => {
                res.json({ msg: 'ok' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.zakaziOdrzavanje = (req, res) => {
            let idP = req.body.idP;
            let pocetak_odrzavanja = req.body.pocetak_odrzavanja;
            posao_1.default.findOneAndUpdate({ 'idP': idP }, { $set: { 'zakazano_odrzavanje': true, 'pocetak_odrzavanja': pocetak_odrzavanja } }).then(msg => {
                res.json({ msg: 'ok' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiVlasnikovaOdrzavanja = (req, res) => {
            let vlasnik = req.body.vlasnik;
            posao_1.default.find({ 'vlasnik': vlasnik, 'zakazano_odrzavanje': true, 'datum_odrzavanja': { $ne: '' } }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiNeobradjeneZaFirmu = (req, res) => {
            let firma = req.body.firma;
            posao_1.default.find({ 'firma': firma, 'status': 'neobradjen' }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.potvrdiPosao = (req, res) => {
            let idP = req.body.idP;
            let dekorater = req.body.dekorater;
            posao_1.default.findOneAndUpdate({ 'idP': idP }, { $set: { 'status': 'potvrdjen', 'dekorater': dekorater } }).then(msg => {
                res.json({ msg: 'job_accepted' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.odbijPosao = (req, res) => {
            let idP = req.body.idP;
            let dekorater = req.body.dekorater;
            let komentar = req.body.komentar;
            posao_1.default.findOneAndUpdate({ 'idP': idP }, { $set: { 'status': 'odbijen', 'dekorater': dekorater, 'komentar': komentar } }).then(msg => {
                res.json({ msg: 'job_rejected' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiZaduzenjaDekoratera = (req, res) => {
            let dekorater = req.body.dekorater;
            posao_1.default.find({ 'dekorater': dekorater, 'status': 'potvrdjen' }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.zavrsiPosao = (req, res) => {
            let idP = req.body.idP;
            let zavrsetak = req.body.zavrsetak;
            let foto = req.body.foto;
            posao_1.default.findOneAndUpdate({ 'idP': idP }, { $set: { 'status': 'zavrsen', 'zavrsetak': zavrsetak, 'poslednje_odrzavanje': zavrsetak, 'fotografija': foto } }).then(msg => {
                res.json({ msg: 'job_ended' });
            }).catch(err => {
                console.log(err);
            });
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
        this.dohvatiZakazanaOdrzavanjaFirme = (req, res) => {
            let firma = req.body.firma;
            posao_1.default.find({ 'firma': firma, 'zakazano_odrzavanje': true }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.potvrdiOdrzavanje = (req, res) => {
            let idP = req.body.idP;
            let zavrsetak_odrzavanja = req.body.zavrsetak_odrzavanja;
            posao_1.default.findOneAndUpdate({ 'idP': idP }, { $set: { 'zakazano_odrzavanje': false, 'pocetak_odrzavanja': '', 'poslednje_odrzavanje': zavrsetak_odrzavanja } }).then(msg => {
                res.json({ msg: 'cleaning_accepted' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.odbijOdrzavanje = (req, res) => {
            let idP = req.body.idP;
            posao_1.default.findOneAndUpdate({ 'idP': idP }, { $set: { 'zakazano_odrzavanje': false, 'pocetak_odrzavanja': '' } }).then(msg => {
                res.json({ msg: 'cleaning_rejected' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSvePosloveDekoratera = (req, res) => {
            let dekorater = req.body.dekorater;
            posao_1.default.find({ 'dekorater': dekorater }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveOcenjenePoslovePoFirmi = (req, res) => {
            let naziv_firme = req.body.naziv_firme;
            posao_1.default.find({ 'firma': naziv_firme, 'ocena': { $ne: 0 } }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveZavrsenePoslove = (req, res) => {
            posao_1.default.find({ 'status': 'zavrsen' }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSvePotvrdjenePoslove = (req, res) => {
            posao_1.default.find({
                $or: [
                    { 'status': 'potvrdjen' },
                    { 'zakazano_odrzavanje': true }
                ]
            })
                .then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiSveZavrsenePosloveSaFoto = (req, res) => {
            posao_1.default.find({ 'status': 'zavrsen', 'fotografija': { $ne: '' } }).then(p => {
                res.json(p);
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.PosaoController = PosaoController;
