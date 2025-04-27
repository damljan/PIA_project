import express from 'express';
import bastaModel from '../models/basta'

export class BastaController {
    dodajBastu = (req: express.Request, res: express.Response) => {
        let novaBasta = new bastaModel(req.body);

        novaBasta.save().then(msg => {
            res.json('JSON fajl bašte je postavljen!');
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiBastuVlasnika = (req: express.Request, res: express.Response) => {
        let vlasnik = req.body.vlasnik;

        bastaModel.findOne({'vlasnik': vlasnik}).then(b => {
            res.json(b);
        }).catch(err => {
            console.log(err)
        })
    }
}