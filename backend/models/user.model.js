const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
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

UserSchema.plugin(passportLocalMongoose);
UserSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

const User = mongoose.model("User", UserSchema);

module.exports = User;