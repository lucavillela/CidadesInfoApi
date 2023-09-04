const express = require('express'); 
const axios = require('axios');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/info', (req, res) => {

    cidade = req.query.cidade

    url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1`

    axios.get(url)
    .then(response => {
        const data = {
            latitude: response.data.results[0].latitude,
            longitude: response.data.results[0].longitude,
            name: response.data.results[0].name,
            population: response.data.results[0].population,
            country: response.data.results[0].country
        };
            
        res.json(data);
    })
    .catch(error => {
        const data = {
            name: "Cidade não encontrada",
        };
        res.json(data);
    });
    
});

app.get('/previsao', (req, res) => {

    latitude = req.query.latitude;
    longitude = req.query.longitude;
    

    url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

    axios.get(url)
    .then(response => {
        const data = {
            temperatura: response.data.current_weather.temperature,
            codigo: response.data.current_weather.weathercode,
            isDay: response.data.current_weather.is_day,
            time: response.data.current_weather.time
        }; 
        res.json(data);
    })
    .catch(error => {
        const data = {
            name: "erro"
        };
        res.json(data);
    });
    
});

app.use(express.static(__dirname));

app.listen(8888, () => {
    console.log('aplicação rodando em: http://localhost:8888');
});