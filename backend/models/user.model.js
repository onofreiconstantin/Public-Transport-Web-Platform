const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required:[true,"Introdu un email"], unique:true,trim:true},
    parola : {type: String, required:[true,"Introdu o parola"], minlength:6,select:false},
    nume : {type: String, required:[true,"Introdu nume"], minlength:2,trim:true},
    prenume : {type: String, required:[true,"Introdu prenume"], minlength:2,trim:true},
    telefon : {type: Number, required:[true,"Introdu un numar telefon"], length:11},
    adresa : {type: String, required:[true,"Introdu o adresa"]},
    pozitie: {type: Boolean, required:true},
},{
    timestamps:true,    
});

userSchema.pre("save",async function(next){
    if(!this.isModified("parola"))
    {
        next();
    }

    const salt = await bcrypt.genSalt(10);

    this.parola = await bcrypt.hash(this.parola,salt);

    next();
});

userSchema.methods.matchParole = async function(parola)
{
    return await bcrypt.compare(parola,this.parola);
}

const User = mongoose.model('User', userSchema);

module.exports = User;