
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    exchange_id:String  ,
    website: String    ,
    name: String ,
   
});

module.exports = mongoose.model('data', dataSchema)