import express from 'express';
import korisnikModel from '../models/korisnik';
import bcrypt from 'bcrypt';

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile_pictures/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = path.basename(file.originalname, path.extname(file.originalname)); // Uzimanje originalnog naziva bez ekstenzije
        const ext = path.extname(file.originalname); // Ekstenzija fajla
    
        cb(null, `${timestamp}_${originalName}${ext}`);
    }
});

const upload = multer({ storage });

export class KorisnikController {
    registracija = (req: express.Request, res: express.Response) => {
        let noviKorisnik = new korisnikModel(req.body);

        if (noviKorisnik.lozinka) {
            bcrypt.hash(noviKorisnik.lozinka, 10).then(hashedPassword => {
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
        } else {
            res.status(400).json({ msg: 'Lozinka nije uneta' });
        }

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

    prijava = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;
    
        korisnikModel.findOne({'korisnicko_ime': korisnicko_ime}).then(korisnik => {
            if (korisnik) {
                let kripto_lozinka = korisnik.lozinka;
    
                if (kripto_lozinka) {
                    bcrypt.compare(lozinka, kripto_lozinka).then(isMatch => {
                        if (isMatch) {
                            res.json({ korisnik });
                        } else {
                            res.json({ msg: 'bad_password' });
                        }
                    }).catch(err => {
                        res.status(500).json({ msg: 'error_comparing_passwords' });
                    });
                }
            } else {
                res.json({ msg: 'user_not_found' });
            }
        }).catch(err => {
            res.status(500).json({ msg: 'server_error' });
        });
    };

    dohvatiSveKorisnike = (req: express.Request, res: express.Response) => {
        korisnikModel.find({}).then(k => {
            res.json(k);
        }).catch(err => {
            console.log(err);
        })
    }

    proveraLozinke = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
    
        korisnikModel.findOne({'korisnicko_ime': kor_ime}).then(korisnik => {
            if (korisnik) {
                let kripto_lozinka = korisnik.lozinka;
    
                if (kripto_lozinka) {
                    bcrypt.compare(lozinka, kripto_lozinka).then(isMatch => {
                        if (isMatch) {
                            res.json({ msg: 'ok' });
                        } else {
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
    }

    promenaLozinke = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let nova_lozinka = req.body.nova_lozinka;

        korisnikModel.findOne({'korisnicko_ime': kor_ime}).then( korisnik => {
            if (korisnik) {
                if (korisnik.lozinka) {
                    bcrypt.hash(nova_lozinka, 10).then(hashedPassword => {
                        korisnik.lozinka = hashedPassword;

                        korisnik.save().then(msg => {
                            res.json({msg: 'updated_password'});
                        }).catch(err => {
                            console.log(err);
                        })
                    })
                }
            }

        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        korisnikModel.findOne({'korisnicko_ime': kor_ime}).then(k => {
            res.json(k);
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSveKorisnikeOsimAdmina = (req: express.Request, res: express.Response) => {
        korisnikModel.find({'tip': {$ne: 'administrator'}}).then(k => {
            res.json(k);
        }).catch(err => {
            console.log(err);
        })
    }

    azurirajKorisnickoIme = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let tip = req.body.tip;
    
        let novo_korisnicko_ime = req.body.novo_korisnicko_ime;
    
        korisnikModel.findOneAndUpdate(
            { 'ime': ime, 'prezime': prezime, 'tip': tip },
            { 'korisnicko_ime': novo_korisnicko_ime }
        ).then(msg => {
            res.json({ msg: "username_updated" });
        }).catch(err => {
            console.log(err);
        });
    }
    
    azurirajAdresu = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let nova_adresa = req.body.nova_adresa;
    
        korisnikModel.findOneAndUpdate(
            { 'korisnicko_ime': korisnicko_ime },
            { 'adresa': nova_adresa }
        ).then(msg => {
            res.json({ msg: "address_updated" });
        }).catch(err => {
            console.log(err);
        });
    }
    
    azurirajKontaktTelefon = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let novi_kontakt_telefon = req.body.novi_kontakt_telefon;
    
        korisnikModel.findOneAndUpdate(
            { 'korisnicko_ime': korisnicko_ime },
            { 'kontakt_telefon': novi_kontakt_telefon }
        ).then(msg => {
            res.json({ msg: "phone_updated" });
        }).catch(err => {
            console.log(err);
        });
    }
    
    azurirajImejl = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let novi_imejl = req.body.novi_imejl;
    
        korisnikModel.findOneAndUpdate(
            { 'korisnicko_ime': korisnicko_ime },
            { 'imejl': novi_imejl }
        ).then(msg => {
            res.json({ msg: "email_updated" });
        }).catch(err => {
            console.log(err);
        });
    }
    
    azurirajKreditnuKarticu = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let novi_broj_kreditne_kartice = req.body.novi_broj_kreditne_kartice;
    
        korisnikModel.findOneAndUpdate(
            { 'korisnicko_ime': korisnicko_ime },
            { 'kreditna_kartica': novi_broj_kreditne_kartice }
        ).then(msg => {
            res.json({ msg: "card_updated" });
        }).catch(err => {
            console.log(err);
        });
    }
    
    azurirajFirmu = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let nova_firma = req.body.nova_firma;
    
        korisnikModel.findOneAndUpdate(
            { 'korisnicko_ime': korisnicko_ime },
            { 'dekorater_firma': nova_firma }
        ).then(msg => {
            res.json({ msg: "firm_updated" });
        }).catch(err => {
            console.log(err);
        });
    }

    azurirajProfilnuSliku = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let nova_slika = req.body.nova_slika;
    
        korisnikModel.findOneAndUpdate(
            { 'korisnicko_ime': korisnicko_ime },
            { 'profilna_slika': nova_slika }
        ).then(doc => {
            if (doc) {
                res.json({ msg: "photo_updated" });
            } else {
                res.status(404).json({ msg: "User not found" });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Server error" });
        });
    }

    dohvatiSvePrihvaceneVlasnike = (req: express.Request, res: express.Response) => {
        korisnikModel.find({'vlasnik_status': 'prihvacen'}).then(v => {
            res.json(v);
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSveAktivneDekoratere = (req: express.Request, res: express.Response) => {
        korisnikModel.find({'dekorater_status': 'aktivan'}).then( d => {
            res.json(d);
        }).catch(err => {
            console.log(err);
        })
    }

    blokirajVlasnika = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;

        korisnikModel.findOneAndUpdate({'korisnicko_ime': korisnicko_ime}, {'vlasnik_status': 'blokiran'}).then(msg => {
            res.json({msg: 'owner_blocked'});
        }).catch(err => {
            console.log(err);
        })
    }

    blokirajDekoratera = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;

        korisnikModel.findOneAndUpdate({'korisnicko_ime': korisnicko_ime}, {'dekorater_status': 'blokiran'}).then(msg => {
            res.json({msg: 'decorator_blocked'});
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSveVlasnikeNaCekanju = (req: express.Request, res: express.Response) => {
        korisnikModel.find({'vlasnik_status': 'naCekanju'}).then(k => {
            res.json(k);
        }).catch(err => {
            console.log(err)
        })
    }

    prihvatiVlasnika = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;

        korisnikModel.findOneAndUpdate({'korisnicko_ime': korisnicko_ime}, {'vlasnik_status': 'prihvacen'}).then(msg => {
            res.json({msg: "owner_accepted"});
        }).catch(err => {
            console.log(err);
        })
    }

    odbijVlasnika = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;

        korisnikModel.findOneAndUpdate({'korisnicko_ime': korisnicko_ime}, {'vlasnik_status': 'odbijen'}).then(msg => {
            res.json({msg: "owner_rejected"});
        }).catch(err => {
            console.log(err);
        })
    }

    odblokirajDekoratera = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;

        korisnikModel.findOneAndUpdate({'korisnicko_ime': korisnicko_ime}, {$set: {'dekorater_status': 'aktivan'}}).then(msg => {
            res.json({msg: 'decorator_activated'});
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSveBlokiraneDekoratere = (req: express.Request, res: express.Response) => {
        korisnikModel.find({'dekorater_status': 'blokiran'}).then( d => {
            res.json(d);
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSveRegistrovaneVlasnike = (req: express.Request, res: express.Response) => {
        korisnikModel.find({'tip': 'vlasnik', 'vlasnik_status': 'prihvacen'}).then(k => {
            res.json(k);
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSveRegistrovaneDekoratere = (req: express.Request, res: express.Response) => {
        korisnikModel.find({'tip': 'dekorater'}).then(k => {
            res.json(k);
        }).catch(err => {
            console.log(err);
        })
    }
    
}
