const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Express Initialization
const app = express();

// Load Routes
const beta = require('./routes/beta')

// Database Connection
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect(db.mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Static Folder Config
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: "Dhruv Bhatia"
    });
});

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: "Shimasu | About"
//     })
// });

// app.use('/beta', beta);

// app.get('/join', (req, res) => {
//     res.render('beta/join', {
//         title: "Shimasu | Beta Join",
//         error: req.query.error,
//         success: req.query.success,
//     });
// });

// Listen
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});