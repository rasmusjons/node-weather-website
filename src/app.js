const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up satitic directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Rasmus J',
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Me',
        name: 'RJ',
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ras-mus',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!',
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                });
            });
        },
    );
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Error',
        name: 'sumsaR',
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'RasMus',
    });
});

//startar servern:
app.listen(3000, () => {
    console.log('server is running on port 3000.');
});
