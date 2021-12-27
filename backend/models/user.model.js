const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        // required: true,
        unique: true, 
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    googleId: {
        type: String
    },
    profile_picture: {
        type: Object,
        required: false
    },
}, {
    timestamps: true,
})

const User = mongoose.model("User", UserSchema);

module.exports = User;