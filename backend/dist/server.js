"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnikRoute_1 = __importDefault(require("./routes/korisnikRoute"));
const path_1 = __importDefault(require("path"));
const firmaRoute_1 = __importDefault(require("./routes/firmaRoute"));
const posaoRoute_1 = __importDefault(require("./routes/posaoRoute"));
const bastaRoute_1 = __importDefault(require("./routes/bastaRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/dekorisanje2024');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("mongoDB connection ok");
});
const router = express_1.default.Router();
router.use('/korisnici', korisnikRoute_1.default);
router.use('/firme', firmaRoute_1.default);
router.use('/poslovi', posaoRoute_1.default);
router.use('/baste', bastaRoute_1.default);
app.use('/uploads/profile_pictures', express_1.default.static(path_1.default.join(__dirname, '../uploads/profile_pictures')));
app.use('/uploads/garden_pictures', express_1.default.static(path_1.default.join(__dirname, '../uploads/garden_pictures')));
app.use('/', router);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
