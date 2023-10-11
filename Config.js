
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1/coinapi',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error',console.error.bind(console,"mongodb connection error"));
db.once('open',()=>{
    console.log('connected to mongodb database')
});

