const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restorantSchema = new Schema({
    nama_restorant: {
        type: String,
        required: true
    },
    id_wilayah: {
        type: Schema.Types.ObjectId,
        ref: 'dataWilayah'
    }
})

let dataRestorant = mongoose.model('dataRestorant', restorantSchema);
module.exports = dataRestorant;