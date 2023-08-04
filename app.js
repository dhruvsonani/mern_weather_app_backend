const express = require('express');
const getCoordsForAddress = require('./utils/geocode');
const forecast = require('./utils/forecast');
const getForecast = require('./utils/forecast');
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

app.get('/api/weather/:loc',async(req,res,next)=>{
    const place = req.params.loc;
    console.log(place);
    let coordinates;
    try{
      coordinates = await getCoordsForAddress(place);
    }
    catch(error)
    {
      console.log(error);
    }
    let placetemp;
    try{
      placetemp = await getForecast(coordinates.lat,coordinates.lng);
    }
    catch(error){
      console.log(error);
    }
    console.log(coordinates);
    console.log(placetemp);
    res.status(201).json({place: coordinates, placetemp: placetemp});
})


app.listen(PORT);