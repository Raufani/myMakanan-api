const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const makananSchema = new Schema({
    nama_makanan: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    id_restorant: {
        type: Schema.Types.ObjectId,
        ref: 'dataRestorant'
    }
})

let dataMakanan = mongoose.model('dataMakanan', makananSchema);
module.exports = dataMakanan;