const express = require("express");
const axios = require('axios');
require('./Config')
const IconModel = require("./IconSchema");
const DataModel = require("./DataSchema");
const app = express()
app.use(express.json())
const cors = require('cors');
app.use(cors());


app.get('/fetch-and-save',async(req,resp)=>{
   
    const apikey = "BDC2FF28-B02D-4F97-9B14-FFC28233048B"
   const resoponce = await axios.get("https://rest.coinapi.io/v1/exchanges",{
    headers:{
        "X-CoinAPI-Key" : apikey
    }
   })
   
   const apidata = resoponce.data
   await DataModel.create(apidata)
   resp.status(200).json({ message: 'Data saved to MongoDB' });
});


app.get('/fetch-icon',async(req,resp)=>{
   
    const apikey = "BDC2FF28-B02D-4F97-9B14-FFC28233048B"
   const result = await axios.get("https://rest.coinapi.io/v1/exchanges/icons/32",{
    headers:{
        "X-CoinAPI-Key" : apikey
    }
   });
   const apidata = result.data
   await IconModel.create(apidata)
   resp.status(200).json({ message: 'Data saved to MongoDB' });
});

app.get("/exchangelist",async(req,resp)=>{
    let data =  await DataModel.find()
    if(data.length>0)
    {
        resp.send(data)
    }else{
        resp.send({result:"data not found"})
    }
});
app.get("/exchangeicon",async(req,resp)=>{
    let data =  await IconModel.find()
    if(data.length>0)
    {
        resp.send(data)
    }else{
        resp.send({result:"data not found"})
    }
});

app.get("/search/:key",async(req,resp)=>{
let result = await DataModel.find({
    "$or":[
        {name:{$regex:req.params.key}}
    ]
})
resp.send(result)
})



app.listen(5000,()=>{
    console.log("5000 port is runnig")
})