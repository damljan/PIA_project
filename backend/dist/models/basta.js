"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Basta = new Schema({
    vlasnik: {
        type: String
    },
    tip_baste: {
        type: String
    },
    zelenila: {
        type: Array
    },
    bazeni: {
        type: Array
    },
    fontane: {
        type: Array
    },
    stolovi: {
        type: Array
    },
    stolice: {
        type: Array
    },
    lezaljke: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('bastaModel', Basta, 'baste');
