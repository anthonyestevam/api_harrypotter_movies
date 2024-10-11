const mongoose = require('../db/conn');
const {Schema} = mongoose;

const Movie = mongoose.model(
    "Movie", 
    new Schema ({
    title: {type:String, required: true},
    description: {type:String, required: true},
    whereWatch: {type:String, required: true},
    img: {type:String, required: true},
}, {timestamps: true}));

module.exports = Movie