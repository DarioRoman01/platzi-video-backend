const express = require('express');
const app = express();
const { config } = require('./config/index')

app.get('/', (_request, response) => {
    response.send('Hello World!!!');
});

app.get('/json', (_request, responose) => {
    responose.json({'Hello': 'World'});
});

app.get('/isLeap/:year', (request, response) => {
    const year = request.params.year;
    if (year%4 === 0) {
        response.send(`The year ${year} is leap`);
    } else {
        response.send(`The year ${year} is not leap`);
    }
});

app.listen(config.port);