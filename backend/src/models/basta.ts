import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
})

export default mongoose.model('bastaModel', Basta, 'baste');