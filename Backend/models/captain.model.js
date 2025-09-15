const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {type: String, required: true,minlength:[3,'First name must be at least 3 characters long']},
        lastname: {type: String, minlength:[3,'Last name must be at least 3 characters long']},
    },
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minlength:[3,'Password must be at least 6 characters long'], select: false},
    socketId: {type: String, default: null},

    status: {type: String, enum: ['active', 'inactive'], default: 'inactive'},
    vehicle:{
        color:{type:String,required:true,minlength:[3,'color must be at least 6 characters long']},

        plate: {type:String,required:true,unique:true,minlength:[3,'Plate must be at least 6 characters long']},

        capacity:{type:Number,required:true,min:[1,'Capacity must be at least 1']},

        vehicleType:{type:String,enum:['drone1','drone2','drone3'],required:true}
    },
    location: {
        lat: {type: Number, default: 0},
        lng: {type: Number, default: 0}
    },
    

});
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
captainSchema.statics.comparePassword = async function(password) { return await bcrypt.compare(password, this.password); }

captainSchema.statics.hashPassword = async function(password) {return await bcrypt.hash(password, 10);}


const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;