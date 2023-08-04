const axios = require("axios");
const API_KEY = process.env.FORECAST_API_KEY;

async function getForecast(lat, lng) {
  const response = await axios.get(
    `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(
      lng
    )},${encodeURIComponent(lat)}&limit=1`
  );
  const data = response.data;

  if (!data || !data.current) {
    const error = new HttpError(
      "Could not find location for the specified co-ordinates",
      422
    );
    throw error;
  }
  const placetemp = {
    temperature: data.current.temperature,
    feelslike: data.current.feelslike,
  };
  return placetemp;
}

module.exports = getForecast;
