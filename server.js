const express = require('express');
const hbs = require('hbs'); // handlebarsjs
const fs = require('fs');
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

/**
 * REGISTERING MIDDLEWARES (use = register)
 */
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    let now = new Date().toString();
    let logMsg = `${now}: ${req.method} ${req.url}`;
    console.log(logMsg);
    fs.appendFile('server.log', logMsg + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

// disables all futher web links calls
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         title: 'Maintenance page',
//         username: 'Chris',
//         pageType: 'Maintenance'
//     })
// });

/**
 * REGISTERING HELPERS (helper == function)
 */
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (input) => {
    return input.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home page',
        username: 'Chris',
        pageType: 'Home'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        message: 'Bad page'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});