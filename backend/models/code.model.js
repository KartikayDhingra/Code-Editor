const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const Code = mongoose.model("Code", CodeSchema);

module.exports = Code;