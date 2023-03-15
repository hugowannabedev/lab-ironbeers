const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (request, response, next) => {
  const beersArr = punkAPI.getBeers();

  beersArr
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);

      const beerData = {
        beers: beersFromApi
      };

      response.render('beers', beerData);
    })
    
});


app.get('/random-beer', (request, response, next) => {
  
  punkAPI.getRandom()
    .then(randomArr => {

      const randomData = {
        beerDetails: randomArr[0]
      }

      response.render('random-beer', randomData);
    })
  .catch();
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
