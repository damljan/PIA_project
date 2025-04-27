import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korisnikRouter from './routes/korisnikRoute';
import path from 'path';
import firmaRouter from './routes/firmaRoute';
import posaoRouter from './routes/posaoRoute';
import bastaRouter from './routes/bastaRoute';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dekorisanje2024');

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongoDB connection ok");
})

const router = express.Router();
router.use('/korisnici', korisnikRouter);
router.use('/firme', firmaRouter);
router.use('/poslovi', posaoRouter);
router.use('/baste', bastaRouter);

app.use('/uploads/profile_pictures', express.static(path.join(__dirname, '../uploads/profile_pictures')));
app.use('/uploads/garden_pictures', express.static(path.join(__dirname, '../uploads/garden_pictures')));

app.use('/', router);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));