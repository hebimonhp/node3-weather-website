const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('../utils/geocode');
const foreCast = require('../utils/forecast');

const app = express();


const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Set up view engines
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));
// Render to static directory
app.get('',(req,res) => {
   res.render('index', {
       title: 'Weather App',
       name: 'OMEGA LUL'
   });
});

app.get('/about',(req,res) => {
   res.render('about', {
       title: 'About',
       name: 'GachiPLS'
   })
});

app.get('/help',(req,res) => {
   res.render('help', {
       helpMessage: 'Show you who \'s the boss in this gym',
       title: 'Help',
       name: 'Nguyen Quoc Viet'
   })
});

// app.com/weather
app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an adress"
        })
    }
    geoCode(req.query.address,(error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send( { error : error});
        }
        foreCast(latitude,longitude, (error, forcastData) => {
            if (error) {
                return res.send({error : error})
            }
            res.send({
                forecast : forcastData,
                location,
                address : req.query.address
            })
        })
    })
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name : 'Gachi Pls',
        errorMessage : 'Help Article Not Found'
    })
});

app.get('/products',(req,res) => {
        if(!req.query.search) {
            return res.send({
                error: "You must provide a search term"
            })
        }
        console.log(req.query.search);
        res.send({
            product: []
        })
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not Found',
        name: 'GachiPls'
    })
});

app.listen(port,() => {
    console.log(`Example app is running on port ${port}`);
});