const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wilayahSchema = new Schema({
    nama_wilayah: {
        type: String,
        required: true
    },
    kode_pos: {
        type: Number,
        required: true
    },
    
})

let dataWilayah = mongoose.model('dataWilayah', wilayahSchema);
module.exports = dataWilayah;