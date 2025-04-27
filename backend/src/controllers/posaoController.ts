import express, { json } from 'express';
import posaoModel from '../models/posao';

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/garden_pictures/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = path.basename(file.originalname, path.extname(file.originalname)); // Uzimanje originalnog naziva bez ekstenzije
        const ext = path.extname(file.originalname); // Ekstenzija fajla
    
        cb(null, `${timestamp}_${originalName}${ext}`);
    }
});

const upload = multer({ storage });

export class PosaoController {
    dodajNoviPosao = (req: express.Request, res: express.Response) => {
        let noviPosao = new posaoModel(req.body);

        let noviId = 0;

        posaoModel.find({}).then(poslovi => {
            if (poslovi) {
                let ids: number[] = [];

                for (let i = 0; i < poslovi.length; i++) {
                    if (poslovi[i].idP != null && poslovi[i].idP != undefined) {
                        ids[i] = poslovi[i].idP as number;
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
                    res.json({msg: 'new_job_added'});
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiPoslovePoFirmi = (req: express.Request, res: express.Response) => {
        let naziv_firme = req.body.naziv_firme;

        posaoModel.find({'firma': naziv_firme, 'komentar': {$ne: ''}}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        }) 
    }

    dohvatiTrenutnaZakazivanja = (req: express.Request, res: express.Response) => {
        let vlasnik = req.body.vlasnik;

        posaoModel.find({'vlasnik': vlasnik, 'status': 'neobradjen'}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err)
        })
    }

    dohvatiPrethodnaZakazivanja = (req: express.Request, res: express.Response) => {
        let vlasnik = req.body.vlasnik;

        posaoModel.find({'vlasnik': vlasnik,'status': 'zavrsen'}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err)
        })
    }

    otkaziPosao = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;

        posaoModel.deleteOne({'idP': idP}).then(msg => {
            res.json({msg: 'job_deleted'});
        }).catch(err => {
            console.log(err);
        })
    }

    dodelaKomentaraOcene = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;

        let komentar = req.body.komentar;
        let ocena = req.body.ocena;

        posaoModel.findOneAndUpdate({'idP': idP}, {$set: {'komentar': komentar, 'ocena': ocena}}).then(msg => {
            res.json({msg: 'ok'});
        }).catch(err => {
            console.log(err);
        })
    }

    zakaziOdrzavanje = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;
        let pocetak_odrzavanja = req.body.pocetak_odrzavanja;

        posaoModel.findOneAndUpdate({'idP': idP}, {$set: {'zakazano_odrzavanje': true, 'pocetak_odrzavanja': pocetak_odrzavanja}}).then(msg => {
            res.json({msg: 'ok'});
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiVlasnikovaOdrzavanja = (req: express.Request, res: express.Response) => {
        let vlasnik = req.body.vlasnik;

        posaoModel.find({'vlasnik': vlasnik, 'zakazano_odrzavanje': true, 'datum_odrzavanja': {$ne: ''}}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiNeobradjeneZaFirmu = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;

        posaoModel.find({'firma': firma, 'status': 'neobradjen'}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        })
    }

    potvrdiPosao = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;
        let dekorater = req.body.dekorater;

        posaoModel.findOneAndUpdate({'idP': idP}, {$set: {'status': 'potvrdjen', 'dekorater': dekorater}}).then(msg => {
            res.json({msg: 'job_accepted'});
        }).catch(err => {
            console.log(err);
        })
    }

    odbijPosao = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;
        let dekorater = req.body.dekorater;
        let komentar = req.body.komentar;

        posaoModel.findOneAndUpdate({'idP': idP}, {$set: {'status': 'odbijen', 'dekorater': dekorater, 'komentar': komentar}}).then(msg => {
            res.json({msg: 'job_rejected'});
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiZaduzenjaDekoratera = (req: express.Request, res: express.Response) => {
        let dekorater = req.body.dekorater;

        posaoModel.find({'dekorater': dekorater, 'status': 'potvrdjen'}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        })
    }

    zavrsiPosao = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;
        let zavrsetak = req.body.zavrsetak;
        let foto = req.body.foto;

        posaoModel.findOneAndUpdate({'idP': idP}, {$set: {'status': 'zavrsen', 'zavrsetak': zavrsetak, 'poslednje_odrzavanje': zavrsetak, 'fotografija': foto}}).then(msg => {
            res.json({msg: 'job_ended'});
        }).catch(err => {
            console.log(err);
        })
    }

    otpremi = (req: express.Request, res: express.Response) => {
        upload.single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'File upload error' });
            } else if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!req.file) {
                return res.status(400).json({ msg: 'Nije poslata slika' });
            }

            const fileName = req.file.filename;
            return res.status(200).json({ msg: 'ok', filePath: fileName });
        });
    }

    dohvatiZakazanaOdrzavanjaFirme = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;

        posaoModel.find({'firma': firma, 'zakazano_odrzavanje': true}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        })
    }

    potvrdiOdrzavanje = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;
        let zavrsetak_odrzavanja = req.body.zavrsetak_odrzavanja;

        posaoModel.findOneAndUpdate({'idP': idP}, {$set: {'zakazano_odrzavanje': false, 'pocetak_odrzavanja': '', 'poslednje_odrzavanje': zavrsetak_odrzavanja}}).then(msg => {
            res.json({msg: 'cleaning_accepted'});
        }).catch(err => {
            console.log(err);
        })
    }

    odbijOdrzavanje = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;

        posaoModel.findOneAndUpdate({'idP': idP}, {$set: {'zakazano_odrzavanje': false, 'pocetak_odrzavanja': ''}}).then(msg => {
            res.json({msg: 'cleaning_rejected'});
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSvePosloveDekoratera = (req: express.Request, res: express.Response) => {
        let dekorater = req.body.dekorater;

        posaoModel.find({'dekorater': dekorater}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSveOcenjenePoslovePoFirmi = (req: express.Request, res: express.Response) => {
        let naziv_firme = req.body.naziv_firme;

        posaoModel.find({'firma': naziv_firme, 'ocena': {$ne: 0}}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        }) 
    }

    dohvatiSveZavrsenePoslove = (req: express.Request, res: express.Response) => {
        posaoModel.find({'status': 'zavrsen'}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSvePotvrdjenePoslove = (req: express.Request, res: express.Response) => {
        posaoModel.find({
            $or: [
                { 'status': 'potvrdjen' },
                { 'zakazano_odrzavanje': true }
            ]
        })
        .then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSveZavrsenePosloveSaFoto = (req: express.Request, res: express.Response) => {
        posaoModel.find({'status': 'zavrsen', 'fotografija': {$ne: ''}}).then(p => {
            res.json(p);
        }).catch(err => {
            console.log(err);
        })
    }

}