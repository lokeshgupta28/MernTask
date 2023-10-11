const mongoose = require("mongoose");

const IconSchema = new mongoose.Schema({
    exchange_id:String ,
    url: String ,
   
});


module.exports = mongoose.model('icon', IconSchema)