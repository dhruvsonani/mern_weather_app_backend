// const request = require('request');

// const geocode = async(location,callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoiZGhydXZzb25hbmkiLCJhIjoiY2xrcXdqdjVvMTNjODNjb2N4aGoweDkxbSJ9.5GA52CTFJVpGWzmaWfHD5Q&limit=1'
//     await request({url,json:true},(error,{body}) =>{
//         if(error){
//             callback('Unable to connect to location api',undefined);
//         }
//         else if(!body.features[0]){
//             callback('Unable to find the co-ordinates for given location',undefined);
//         }
//         else{
//             callback(undefined,{
//                 latitude:body.features[0].center[0],
//                 longitude:body.features[0].center[1],
//                 location:body.features[0].place_name
//             }
//             )
//         }
//     })
// }

// module.exports = geocode;

const axios = require("axios");
const API_KEY = process.env.GEOCODE_API_KEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${API_KEY}&limit=1`
  );

  const data = response.data;

  if (!data || !data.features) {
    const error = new HttpError(
      "Could not find location for the specified address",
      422
    );
    throw error;
  }
  const coordinates = {
    lat: data.features[0].center[1],
    lng: data.features[0].center[0],
  };
  return coordinates;
}

module.exports = getCoordsForAddress;
