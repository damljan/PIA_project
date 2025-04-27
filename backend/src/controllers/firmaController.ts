import express from 'express';
import firmaModel from '../models/firma';
import l from 'leaflet';

export class FirmaController {
    dodajNovuFirmu = (req: express.Request, res: express.Response) => {
        let novaFirma = new firmaModel(req.body);

        novaFirma.save().then(msg => {
            res.json({msg: "firm_added"});
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiSveFirme = (req: express.Request, res: express.Response) => {
        firmaModel.find({}).then(f => {
            res.json(f);
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiFirmuPoNazivu = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        firmaModel.findOne({'naziv': naziv}).then(f => {
            res.json(f);
        }).catch(err => {
            console.log(err);
        })
    }
}
